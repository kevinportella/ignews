module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.vscode/"],
  setupFilesAfterEnv:[
    "<rootDir>/src/tests/SetupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
  ],
  coverageReporters: ["lcov","json"]
}
