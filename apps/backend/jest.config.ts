import { Config } from 'jest';

export default {
  rootDir: './',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  testRegex: '.*\\.(spec|test|e2e)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    'src/**/*.ts', // Только TypeScript файлы
    '!src/**/*.(spec|test).ts', // Исключаем тестовые файлы
    '!src/**/*.(module|config).ts', // Исключаем NestJS модули и конфиги
    '!src/main.ts', // Исключаем главный entrypoint
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
} as Config;