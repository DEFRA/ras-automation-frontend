/**
 * @type {Config}
 */
export default {
  rootDir: '.',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  setupFiles: ['<rootDir>/.jest/setup-file.js'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-file-after-env.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/server/common/test-helpers',
    '<rootDir>/src/server/common/helpers/fetchProxyWrapper.js',
    '<rootDir>/src/server/common/helpers/proxy-agent.js',
    '<rootDir>/src/server/common/helpers/proxy-fetch.js',
    '<rootDir>/src/server/common/db/',
    '<rootDir>/src/server/common/services/',
    '<rootDir>/src/server/processQueue',
    '<rootDir>/src/server/webhook',
    '<rootDir>/src/client/javascripts/application.js',
    '<rootDir>/src/index.js',
    'index.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    `node_modules/(?!${[
      '@defra/hapi-tracing', // Supports ESM only
      'node-fetch' // Supports ESM only
    ].join('|')}/)`
  ]
}

/**
 * @import { Config } from 'jest'
 */
