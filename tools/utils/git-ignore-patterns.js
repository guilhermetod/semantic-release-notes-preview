const { readFileSync } = require('fs');

const gitIgnorePatterns = readFileSync('.gitignore', 'utf8')
  .split('\n')
  .filter((line) => line && line.charAt(0) !== '#');

module.exports = { gitIgnorePatterns };
