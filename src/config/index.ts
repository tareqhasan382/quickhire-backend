import dotenv from "dotenv";
import Path from "path";
dotenv.config({ path: Path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  demo: {
    admin: {
      name: "Sam Patel",
      email: process.env.DEMO_ADMIN_EMAIL,
      password: process.env.DEMO_ADMIN_PASSWORD,
    },
    recruiter: {
      name: "Jordan Rivera",
      email: process.env.DEMO_RECRUITER_EMAIL,
      password: process.env.DEMO_RECRUITER_PASSWORD,
    },
    candidate: {
      name: "Alex Morgan",
      email: process.env.DEMO_CANDIDATE_EMAIL,
      password: process.env.DEMO_CANDIDATE_PASSWORD,
    },
  },
};