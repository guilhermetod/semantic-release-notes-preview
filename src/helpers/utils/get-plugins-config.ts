import { cosmiconfig } from 'cosmiconfig';
import semanticRelease from 'semantic-release';

import { resolvePluginConfig } from '@src/helpers/utils/resolve-plugin-config';

export async function getPluginsConfig(): Promise<semanticRelease.PluginSpec[]> {
  const result = await cosmiconfig('release').search();
  const plugins = result?.config?.plugins ?? [];

  return [
    resolvePluginConfig(plugins, '@semantic-release/commit-analyzer'),
    resolvePluginConfig(plugins, '@semantic-release/release-notes-generator'),
  ];
}
