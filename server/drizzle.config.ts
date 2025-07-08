import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.ts";

export default defineConfig({
    dialect: "postgresql",
    casing: "snake_case",
    schema: "./src/db/schema/**.ts",
    out: "./src/db/miagrations",
    dbCredentials:{
        url: env.DATABASE_URL
    } 
})