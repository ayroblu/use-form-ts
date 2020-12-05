module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
