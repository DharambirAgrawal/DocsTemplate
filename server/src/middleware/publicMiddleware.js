export const checkBlogApiKey = (req, res, next) => {
  if (req.headers["x-api-key"] === process.env.PUBLIC_BLOG_KEY) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, invalid API key");
  }
};
