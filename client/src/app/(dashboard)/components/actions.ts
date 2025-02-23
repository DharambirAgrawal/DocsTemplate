"use server";
import { headers } from "next/headers";
export const getroles = async () => {
  const headersList = await headers();
  const role = headersList.get("x-role");
  if (role) {
    return {
      success: true,
      role: role,
    };
  } else {
    return {
      success: false,
      role: null,
    };
  }
};
