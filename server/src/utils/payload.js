export const ADMIN_PAYLOAD = (email) => {
  return {
    type: "JWT",
    email: email,
  };
};

export const SUBSCRIPTION_PAYLOAD = (email) => {
  return {
    type: "EMAIL",
    email: email,
  };
};
