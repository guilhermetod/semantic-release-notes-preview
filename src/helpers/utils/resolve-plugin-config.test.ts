import semanticRelease from 'semantic-release';

import { resolvePluginConfig } from '@src/helpers/utils/resolve-plugin-config';

describe('resolvePluginConfig', () => {
  const dummyPluginName = 'dummy-plugin';
  const dummyPluginOptions = { test: true };

  it('should return the plugin config as a string when it does not contain options', () => {
    const plugins = ['unknown-plugin', dummyPluginName];

    const result = resolvePluginConfig(plugins, dummyPluginName);

    expect(result).toEqual(dummyPluginName);
  });

  it('should return the plugin config within an array when it contains options', () => {
    const dummyConfig = [dummyPluginName, dummyPluginOptions];
    const plugins = ['unknown-plugin', dummyConfig] as semanticRelease.PluginSpec[];

    const config = resolvePluginConfig(plugins, dummyPluginName);

    expect(config).toEqual([dummyPluginName, dummyPluginOptions]);
  });

  it('should return the plugin name if no plugin is matched', () => {
    const plugins = [dummyPluginName];

    const result = resolvePluginConfig(plugins, 'unknown-plugin');

    expect(result).toEqual('unknown-plugin');
  });
});
