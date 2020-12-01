const { execSync } = require('child_process');
const writeGood = require('write-good');
const fs = require('fs');
const core = require('@actions/core');

const fileExt = ['md', 'markdown', 'mkdn', 'mkd', 'mdown'];

try {
  const files = core.getInput('files').split(' ');
  const output = execSync('ls', { encoding: 'utf-8' });
  console.log(`Hello ${files}!`, typeof files, output);
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);
  files.forEach((file) => {
    if (fileExt.includes(file.split('.').pop().toLowerCase())) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) core.setFailed(err);
        const suggestions = writeGood(data);
        if (suggestions.length > 0) core.setFailed(suggestions);
      });
    }
  });
} catch (err) {
  core.setFailed(err.message);
}
