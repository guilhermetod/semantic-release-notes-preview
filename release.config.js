const { releaseRules } = require('./tools/utils/release-rules');

module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits', releaseRules }],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/git', {
      assets: ['dist/index.js', 'package.json', 'package-lock.json'],
      // eslint-disable-next-line no-template-curly-in-string
      message: 'Chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
    '@semantic-release/github',
  ],
};
