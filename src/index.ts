import { error } from '@actions/core';

import { outputPreview } from '@src/core/output-preview';

outputPreview()
  .catch((e) => error(e));
