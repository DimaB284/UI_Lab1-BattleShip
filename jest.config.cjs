module.exports = {
  testEnvironment: 'jest-environment-jsdom', 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  cache: false,
  verbose: true,
};