import { execSync } from 'child_process';

import { setOutput } from '@actions/core';
import semanticRelease from 'semantic-release';

import { getBaseConfig } from '@src/helpers/utils/get-base-config';

async function dryRunRelease(): Promise<semanticRelease.Result> {
  execSync(`git checkout ${process.env.GITHUB_HEAD_REF}`);

  return semanticRelease({
    ...await getBaseConfig(),
    ci: false,
    dryRun: true,
  }, {
    env: { ...process.env, GITHUB_ACTIONS: '' },
  });
}

export async function outputPreview(): Promise<void> {
  const result = await dryRunRelease();

  if (!result) {
    throw new Error('Failed to generate preview');
  }

  setOutput('releaseNotes', result.nextRelease.notes);
}
