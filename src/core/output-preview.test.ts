import { setOutput } from '@actions/core';
import { mocked } from 'jest-mock';
import semanticRelease from 'semantic-release';

import { outputPreview } from '@src/core/output-preview';
import { getBaseConfig } from '@src/helpers/utils/get-base-config';

jest.mock('child_process');
jest.mock('@actions/core');
jest.mock('semantic-release');
jest.mock('@src/helpers/utils/get-base-config');

describe('outputPreview', () => {
  const plugins = ['dummy-plugin'];
  const prBranch = 'main';
  process.env.GITHUB_HEAD_REF = prBranch;

  it('should generate the release notes and output it to GitHub Actions', async () => {
    const notes = 'Release notes';
    const version = '1.0.0';
    const nextRelease = { notes, version };
    mocked(semanticRelease).mockResolvedValue({ nextRelease } as semanticRelease.Result);
    mocked(getBaseConfig).mockResolvedValue({ branches: [prBranch], plugins });

    await outputPreview();

    expect(semanticRelease).toHaveBeenCalledWith(
      expect.objectContaining({ ci: false, dryRun: true, branches: [prBranch], plugins }),
      expect.objectContaining({ env: { ...process.env, GITHUB_ACTIONS: '' } }),
    );
    expect(setOutput).toHaveBeenCalledWith('releaseNotes', notes);
    expect(setOutput).toHaveBeenCalledWith('releaseVersion', version);
  });
});
