const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const del = require('del');
const pify = require('pify');
const emojione = require('emojione-assets/emoji.json');

const write = pify(fs.writeFile);

const baseDir = path.join(
  path.dirname(require.resolve('emojione-assets/emoji.json')),
  './png/64'
);

gulp.task('copy', () =>
  gulp.src(`${baseDir}/*.png`)
    .pipe(gulp.dest('emoji/'))
);

gulp.task('json', () => {
  const emoji = {};
  Object.keys(emojione).forEach((unicode) => {
    const image = `${unicode}.png`;
    emoji[emojione[unicode].shortname.slice(1, -1)] = image;
    emojione[unicode].shortname_alternates.forEach((alias) => {
      emoji[alias.slice(1, -1)] = image;
    });
  });
  return write(
    path.join(__dirname, './emoji.json'),
    JSON.stringify(emoji),
    'utf8'
  );
});

gulp.task('clean', () => del('emoji', 'emoji.json'));

gulp.task('default', ['copy', 'json']);
