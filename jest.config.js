module.exports = {
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(avif|svg|png|webp)$": "identity-obj-proxy"
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      "\\.(avif)$": "jest-transform-stub"
    },
    transformIgnorePatterns: [
      "/node_modules/"
    ],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
  };
  