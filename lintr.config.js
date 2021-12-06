const { presets } = require('@guilhermetod/lintr');

module.exports = {
  linters: [
    presets.eslint({ pattern: '**/*.(js|ts)' }),
    presets.typescript(),
  ],
  errorOnEmptyTarget: false,
  useIcons: true,
};
