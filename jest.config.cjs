module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.styles.{js,jsx,ts,tsx}',
    '!src/**/index.tsx',
    '!src/**/ThemeProvider.tsx',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testRegex: '\\.test\\.(js|jsx|ts|tsx)$',
  transformIgnorePatterns: ['/node_modules/(?!(@babel)/)'],
  coveragePathIgnorePatterns: ['node_modules'],
  modulePaths: ['./src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 300000,
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
}
