const core = require('@actions/core');
const github = require('@actions/github');
const writeGood = require('write-good');
const fs = require('fs');

const fileExt = ['.md', '.markdown', 'mkdn', 'mkd', 'mdown'];

try {
  const files = core.getInput('files').split(' ');
  console.log(`Hello ${files}!`, typeof(files));
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  files.forEach((file) => {
    console.log(file, typeof(file));
    if (fileExt.includes(file.split('.').pop().toLowerCase())) fs.readFile(files, 'utf8', (err, data) => {
      console.log(data);
      if (err) core.setFailed(err);
      const suggestions = writeGood(data);
      if (suggestions.length > 0) core.setFailed(suggestions);
    });
  });
} catch (err) {
  core.setFailed(err.message);
}

