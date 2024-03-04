import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  verbose: true,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};

export default config;
