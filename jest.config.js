const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: '<rootDir>/tests/reports/coverage',
  coveragePathIgnorePatterns: [
    'index\\.ts$',
    '\\.d\\.ts$',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  preset: 'ts-jest',
  restoreMocks: true,
  testEnvironment: 'node',
};
