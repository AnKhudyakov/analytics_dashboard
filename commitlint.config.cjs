module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'style', 'refactor', 'perf', 'test']
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case']],
    'footer-max-length': [2, 'always', 100],
  },
};
