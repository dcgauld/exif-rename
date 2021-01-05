#!/usr/bin/env node

const exifParser = require('exif-parser');
const fs = require('fs');
const glob = require('glob');
const minimist = require('minimist');
const path = require('path');

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = date.getDate();
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const second = `${date.getSeconds()}`.padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function renameFile(filePath, args) {
  if (!fs.existsSync(filePath)) return;

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const parser = exifParser.create(fileBuffer);
    const exifData = parser.parse();
    const exifDate = exifData.tags.DateTimeOriginal;
    const parsedPath = path.parse(filePath);

    const newPath = path.format({
      dir: parsedPath.dir,
      ext: parsedPath.ext,
      name: args.format ? formatDate(exifDate) : exifDate,
    });

    fs.renameSync(filePath, newPath);
    console.log(`${filePath} -> ${newPath}`);
  } catch (error) {
    console.log(error);
  }
}

function main() {
  const args = minimist(process.argv.slice(2));

  const paths = glob
    .sync(args._.join(','), { nodir: true })
    .map((filePath) => path.resolve(filePath));

  if (!paths.length) {
    console.log('No paths specified.');
    return;
  }

  paths.forEach((filePath) => renameFile(filePath, args));
  console.log('Done.');
}

main();
