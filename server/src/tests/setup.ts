import { getTestDatabaseUrl } from "./testDatabase.js";

process.env.DATABASE_URL = getTestDatabaseUrl();