const { execSync } = require('child_process');
const writeGood = require('write-good');
const fs = require('fs');
const core = require('@actions/core');

const fileExt = ['md', 'markdown', 'mkdn', 'mkd', 'mdown'];

try {
  // const filess = core.getInput('files').split(' ');
  const files = execSync('git ls-files', { encoding: 'utf-8' });
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);
  files.forEach((file) => {
    if (fileExt.includes(file.split('.').pop().toLowerCase())) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) core.setFailed(err);
        const suggestions = writeGood(data);
        const jsonSuggestions = JSON.stringify(suggestions);
        if (suggestions.length > 0) core.setFailed(`file: ${file}, suggestions: ${jsonSuggestions}`);
      });
    }
  });
} catch (err) {
  core.setFailed(err.message);
}
