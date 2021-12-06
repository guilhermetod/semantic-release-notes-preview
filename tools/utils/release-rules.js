const releaseRules = [
  { type: 'Build', release: 'patch' },
  { type: 'Chore', release: false },
  { type: 'CI', release: false },
  { type: 'Docs', release: false },
  { type: 'Feat', release: 'minor' },
  { type: 'Fix', release: 'patch' },
  { type: 'Perf', release: 'patch' },
  { type: 'Refactor', release: 'patch' },
  { type: 'Revert', release: 'patch' },
  { type: 'Style', release: false },
  { type: 'Test', release: false },
];

module.exports = { releaseRules };
