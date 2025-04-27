import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';
import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths as Record<string, string[]>,
    {
      prefix: '<rootDir>/',
    },
  ),
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage-e2e',
  testEnvironment: 'node',
};

export default config;
