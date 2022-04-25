/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{ts, js}',
    '!**/node_modules/**',
    '!**/mock-data.ts',
  ],
  testTimeout: 20000,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
