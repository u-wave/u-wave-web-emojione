const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const del = require('del');
const pify = require('pify');
const emojione = require('emojione/emoji.json');

const write = pify(fs.writeFile);

const baseDir = path.join(
  path.dirname(require.resolve('emojione/emoji.json')),
  './assets/png'
);

gulp.task('copy', () =>
  gulp.src(`${baseDir}/*.png`)
    .pipe(gulp.dest('emoji/'))
);

gulp.task('json', () => {
  const emoji = {};
  Object.keys(emojione).forEach((name) => {
    const image = `${emojione[name].unicode}.png`;
    emoji[name] = image;
    emojione[name].aliases.forEach((alias) => {
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
