import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index";
import { nextCookies } from "better-auth/next-js";

import { user, account, session } from "@/lib/db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, { 
    provider: "pg", // or "pg" or "mysql"
    schema: {
      user,       // 👈 EXACT key name required
      account,
      session,
    },
  }), 

  emailAndPassword: {
    enabled: true,
  },
  //... the rest of your config

   plugins: [nextCookies()]
});