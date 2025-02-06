export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN" | "AUTHOR";
  accountStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  providerProfileImage: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}