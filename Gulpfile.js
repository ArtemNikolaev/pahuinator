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

function moveImages() {
  return src(path.join(publicFolder, 'images/*'))
    .pipe(dest(path.join(distFolder, 'images')));
}

function moveManifest() {
  return src(path.join(publicFolder, 'manifest.json'))
    .pipe(dest(distFolder));
}

function moveFavicon() {
  return src(path.join(publicFolder, 'favicon.ico'))
    .pipe(dest(distFolder));
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
  moveManifest,
  moveImages,
  moveFavicon,
  series(
    parallel(
      styles,
      code,
    ),
    html,
  ),
);
