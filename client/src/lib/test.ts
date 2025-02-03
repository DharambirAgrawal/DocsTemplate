"use client";

export async function setCookie(
  name: string,
  value: string,
  options: any = {}
) {
  const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.JWT_TOKEN_SECRET}`, // Add Authorization header
    },
    body: JSON.stringify({
      name,
      value,
      options,
    }),
  });

  if (!res.ok) {
    throw new Error("Error setting cookie");
  }
}
