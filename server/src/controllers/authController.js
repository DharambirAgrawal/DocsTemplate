import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../../app.js";
import { validateEmail } from "../utils/utils.js";
import { decodeToken, generateToken } from "../utils/jwtUtils.js";
import { comparePasswords } from "../utils/utils.js";
import { validatePassword } from "../utils/utils.js";
import { hashData } from "../utils/utils.js";

import { ADMIN_PAYLOAD } from "../utils/payload.js";
//register ---->
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new AppError("Resource not found", 400);
  }

  //validating email
  if (!validateEmail(email)) {
    throw new AppError("Invalid Email!", 400);
  }
  if (!validatePassword(password)) {
    throw new AppError("Invalid Password!", 400);
  }

  //Checking if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email }, // Use your unique field here, such as email
  });

  if (existingUser) {
    throw new AppError("User already Exists", 400);
  }

  //Creating new user
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: await hashData(password), // Make sure to hash the password before saving it
      accountStatus: "ACTIVE",
      role: role.toUpperCase(),
    },
  });
  if (!newUser) {
    throw new AppError("Failed to create user", 500);
  }

  res.status(200).json({
    message: "success",
  });
});

// <-------- end of register

//login ---->
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Resource not found", 400);
  }

  //validating email
  if (!validateEmail(email)) {
    throw new AppError("Invalid Email!", 400);
  }

  //finding user
  const User = await prisma.user.findUnique({
    where: { email: email }, // Use your unique field here, such as email
  });

  if (!User) {
    throw new AppError("User not found", 404);
  }

  // Check accountStatus & Check lockoutUntil

  if (User.accountStatus == "INACTIVE" || User.accountStatus == "SUSPENDED") {
    // TODO: Reset password email
    return res.status(403).json({
      status: "failed",
      message: "Unauthorized to login!",
    });
  }

  if (User.accountStatus == "PENDING") {
    // TODO: Manage pending state
    return res.status(403).json({
      status: "failed",
      message: "Unauthorized to login!",
    });
  }

  //check lockoutUntil time

  if (User.lockoutUntil) {
    if (User.lockoutUntil.getTime() > Date.now()) {
      return res.status(403).json({
        status: "failed",
        message: "Try again in 15 Minutes",
      });
    }
  }

  //Compare password
  const iscorrect = await comparePasswords(password, User.password);

  if (!iscorrect) {
    if (User.failedLoginAttempts < 10) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          failedLoginAttempts: User.failedLoginAttempts + 1,
        },
      });
    } else if (User.failedLoginAttempts > 20) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          failedLoginAttempts: User.failedLoginAttempts + 1,
          accountStatus: "SUSPENDED",
          lockoutUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        },
      });
    } else {
      // for greater then 10 and less than 200
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          failedLoginAttempts: User.failedLoginAttempts + 1,
          lockoutUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        },
      });
    }

    return res.status(400).json({
      status: "failed",
      message: "Incorrect password!",
    });
  }

  // Create unique sessionId refreshToken, accessToken from email and sessionId

  const jwtToken = generateToken(
    { role: User.role, ...ADMIN_PAYLOAD(email) },
    process.env.JWT_TOKEN_SECRET,
    1440
  ); // 1 day

  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      lockoutUntil: null,
      failedLoginAttempts: 0,
      jwtToken: jwtToken,
      lastActiveAt: new Date(Date.now()),
    },
  });

  if (!updatedUser) {
    throw new AppError("Failed to update user", 500);
  }

  res.cookie("token", jwtToken, {
    httpOnly: true, // Prevents access to the cookie via JavaScript
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "Strict", // Prevents CSRF attacks
    // No maxAge or expires set - this makes it a session cookie
  });
  // const token = req.cookies.token; to get cookeie anywhere
  res.status(200).json({
    status: "success",
    data: {
      name: updatedUser.name,
    },
  });
});

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Invalid request", 404);
  }

  const { email, role, type } = decodeToken(
    token,
    process.env.JWT_TOKEN_SECRET
  );

  if (!email || !type || !validateEmail(email) || !role) {
    throw new AppError("Invalid request", 404);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || user.jwtToken !== token || user.role !== role) {
    throw new AppError("Invalid request", 404);
  }

  res.status(200).json({
    status: "success",
    role: user.role,
    email: user.email,
    name: user.name,
  });
});
// <-------- end of login

//logout ---->
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Invalid request", 404);
  }

  const { email, role, type } = decodeToken(
    token,
    process.env.JWT_TOKEN_SECRET
  );

  if (!email || !type || !validateEmail(email) || !role) {
    throw new AppError("Invalid request", 404);
  }

  // Delete the session
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      jwtToken: null,
    },
  });

  res.status(200).json({
    status: "success",
  });
});
// <-------- logout

export const getUser = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      image: true,
      summary: true,
      title: true,
      _count: {
        select: {
          posts: {
            where: {
              published: true, // Count only published posts
            },
          },
        },
      },
    },
  });

  const filteredUsers = users
    .filter((user) => user._count.posts > 0) // Only categories with > 0 published posts
    .map((user) => ({
      ...user,
      posts: user._count.posts, // Rename _count.posts to count
      _count: undefined, // Optionally remove the _count field
    }));
  res.status(200).json({
    status: "success",
    data: filteredUsers,
  });
});
