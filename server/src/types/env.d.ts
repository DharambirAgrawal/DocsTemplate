declare namespace NodeJS {
    interface ProcessEnv {
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      MONGO_URI:string
      COOKIE_SECRET:string
      VERIFY_EMAIL_SECRET:string
      GOOGLE_CLIENT_ID:string
      GOOGLE_CLIENT_SECRET:string
      JWT_TOKEN_SECRET:string
    }
  }
  