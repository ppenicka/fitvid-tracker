const gulp = require('gulp');
const eslint = require('gulp-eslint');

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!node_modules{,/**}',
    '!.git{,/**}',
    '!**/node_modules{,/**}',
    '!**/build{,/**}',
    '!**/package.json',
    '!**/package-lock.json',
    '!**/manifest.json',
  ]);
}

// JavaScript and JSON linter
function lint () {
  return gulp
    .src(addDefSrcIgnore(['**/*.js', '**/*.json']), { dot: true })
    .pipe(eslint({ dotfiles: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Lint all files
exports.lint = lint;
