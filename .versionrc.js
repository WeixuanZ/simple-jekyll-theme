module.exports = {
  bumpFiles: [
    {
      filename: "package.json",
    },
    {
      filename: "simple-jekyll-theme.gemspec",
      updater: "scripts/standard-version-updater.js"
    }
  ],
  types: [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "style", "section": "Style Changes"},
    {"type": "perf", "section": "Performance Improvements"},
    {"type": "chore", "hidden": true},
    {"type": "docs", "hidden": true},
    {"type": "refactor", "hidden": true},
    {"type": "test", "hidden": true}
  ]
};
