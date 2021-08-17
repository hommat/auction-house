module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/(?:.+?)/__mocks__/'],
  moduleNameMapper: {
    '@account/(.*)': '<rootDir>/src/account/$1',
    '@auction/(.*)': '<rootDir>/src/auction/$1',
    '@security/(.*)': '<rootDir>/src/security/$1',
    '@shared-kernel/(.*)': '<rootDir>/src/shared-kernel/$1',

    '@ui/(.*)': '<rootDir>/src/ui/$1',

    '@mocks/(.*)': '<rootDir>/src/__tests__/__mocks__/$1',
  },
};
