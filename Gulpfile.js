const path = require('path');
const {
  series,
  parallel,
  src,
  dest,
} = require('gulp');
const pug = require('gulp-pug-3');

const publicFolder = './public/';

function moveAudio(cb) {
  cb();
}

function styles(cb) {
  cb();
}

function code(cb) {
  cb();
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
    .pipe(dest('dist'));
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
