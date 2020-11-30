const core = require('@actions/core');
const github = require('@actions/github');
const writeGood = require('write-good');
const fs = require('fs');

try {
  const files = core.getInput('files');
  console.log(`Hello ${files}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  fs.readFile(files, 'utf8', (err, data) => {
    if (err) core.setFailed(err);
    const suggestions = writeGood(data);
    if (suggestions.trim().length() > 0) core.setFailed(suggestions);
  });
} catch (err) {
  core.setFailed(err.message);
}

