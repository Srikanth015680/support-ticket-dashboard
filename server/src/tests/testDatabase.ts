import "dotenv/config";

export function getTestDatabaseUrl(): string {
  const testUrl = process.env.TEST_DATABASE_URL;

  if (!testUrl) {
    throw new Error(
      "TEST_DATABASE_URL is not set. Add it to server/.env (see .env.example).",
    );
  }

  if (testUrl === process.env.DATABASE_URL) {
    throw new Error(
      "TEST_DATABASE_URL must differ from DATABASE_URL. Tests may modify test data.",
    );
  }

  return testUrl;
}