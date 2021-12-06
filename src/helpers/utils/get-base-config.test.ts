import { cosmiconfig } from 'cosmiconfig';
import { mocked } from 'jest-mock';

import { getBaseConfig } from '@src/helpers/utils/get-base-config';
import { resolvePluginConfig } from '@src/helpers/utils/resolve-plugin-config';

jest.mock('cosmiconfig');
jest.mock('@src/helpers/utils/resolve-plugin-config');

const mockSearchResult = (searchResult: unknown): void => {
  const mock = { search: () => Promise.resolve(searchResult) } as ReturnType<typeof cosmiconfig>;
  mocked(cosmiconfig).mockReturnValue(mock);
};

describe('getBaseConfig', () => {
  const prBranch = 'main';
  process.env.GITHUB_HEAD_REF = prBranch;

  it('should return the config for commit analyzer and release notes generator', async () => {
    const plugins = ['dummy-plugin'];
    mockSearchResult({ config: { plugins } });
    mocked(resolvePluginConfig).mockImplementation((config, pluginName) => pluginName);

    const result = await getBaseConfig();

    expect(resolvePluginConfig).toHaveBeenCalledWith(plugins, '@semantic-release/commit-analyzer');
    expect(resolvePluginConfig).toHaveBeenCalledWith(plugins, '@semantic-release/release-notes-generator');
    expect(result).toMatchObject({
      branches: ['main'],
      plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
      ],
    });
  });
});
