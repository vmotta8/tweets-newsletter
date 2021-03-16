const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1'
  }
}
