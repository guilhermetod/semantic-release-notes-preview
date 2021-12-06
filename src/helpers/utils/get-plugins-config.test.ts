import { cosmiconfig } from 'cosmiconfig';
import { mocked } from 'jest-mock';

import { getPluginsConfig } from '@src/helpers/utils/get-plugins-config';
import { resolvePluginConfig } from '@src/helpers/utils/resolve-plugin-config';

jest.mock('cosmiconfig');
jest.mock('@src/helpers/utils/resolve-plugin-config');

const mockSearchResult = (searchResult: unknown): void => {
  const mock = { search: () => Promise.resolve(searchResult) } as ReturnType<typeof cosmiconfig>;
  mocked(cosmiconfig).mockReturnValue(mock);
};

describe('getPluginsConfig', () => {
  it('should return the config for commit analyzer and release notes generator', async () => {
    const plugins = ['dummy-plugin'];
    mockSearchResult({ config: { plugins } });
    mocked(resolvePluginConfig).mockImplementation((config, pluginName) => pluginName);

    const result = await getPluginsConfig();

    expect(resolvePluginConfig).toHaveBeenCalledWith(plugins, '@semantic-release/commit-analyzer');
    expect(resolvePluginConfig).toHaveBeenCalledWith(plugins, '@semantic-release/release-notes-generator');
    expect(result).toEqual([
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
    ]);
  });
});
