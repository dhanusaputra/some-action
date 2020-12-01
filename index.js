import { execSync } from 'child_process';
import { writeGood } from 'write-good';
import { fs } from 'fs';
import { getInput, setFailed, setOutput } from '@actions/core';

const fileExt = ['md', 'markdown', 'mkdn', 'mkd', 'mdown'];

try {
  const files = getInput('files').split(' ');
  const output = execSync('ls', { encoding: 'utf-8' });
  console.log(`Hello ${files}!`, typeof files, output);
  const time = (new Date()).toTimeString();
  setOutput('time', time);
  files.forEach((file) => {
    if (fileExt.includes(file.split('.').pop().toLowerCase())) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) setFailed(err);
        const suggestions = writeGood(data);
        if (suggestions.length > 0) setFailed(suggestions);
      });
    }
  });
} catch (err) {
  setFailed(err.message);
}
