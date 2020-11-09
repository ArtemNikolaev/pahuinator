const path = require('path');
const {
  series,
  parallel,
  src,
  dest,
} = require('gulp');
const pug = require('gulp-pug-3');

const publicFolder = './public/';
const distFolder = './dist/';

function moveAudio() {
  return src(path.join(publicFolder, 'audio/*'))
    .pipe(dest(path.join(distFolder, 'audio')));
}

function styles(cb) {
  cb();
}

function code() {
  return src(path.join(publicFolder, 'js/*.js'))
    .pipe(dest(distFolder));
}

function html() {
  return src(path.join(publicFolder, 'index.pug'))
    .pipe(
      pug({
        locals: {
          test: 'Test',
        },
      }),
    )
    .pipe(dest(distFolder));
}

exports.default = parallel(
  moveAudio,
  series(
    parallel(
      styles,
      code,
    ),
    html,
  ),
);
