const path = require('path');
const {
  series,
  parallel,
  src,
  dest,
  watch,
} = require('gulp');
const pug = require('gulp-pug-3');

const srcFolder = './public/';
const distFolder = './dist/';

function moveAudio() {
  return src(path.join(srcFolder, 'audio/*'))
    .pipe(dest(path.join(distFolder, 'audio')));
}

function moveRoot() {
  return src(path.join(srcFolder, 'root/*'))
    .pipe(dest(distFolder));
}

function moveImages() {
  return src(path.join(srcFolder, 'images/*'))
    .pipe(dest(path.join(distFolder, 'images')));
}

function styles(cb) {
  // todo: move styles
  cb();
}

function code() {
  return src(
    path.join(srcFolder, 'js/*.js'),
    { ignore: path.join(srcFolder, 'js/_*.js') }
  )
    .pipe(dest(distFolder));
}

function html() {
  return src(path.join(srcFolder, 'index.pug'))
    .pipe(
      pug({
        locals: {
          test: 'Test',
        },
      }),
    )
    .pipe(dest(distFolder));
}

function watchAll() {
  return watch([srcFolder], build);
}

const build = parallel(
  moveAudio,
  moveImages,
  moveRoot,
  series(
    parallel(
      styles,
      code,
    ),
    html,
  ),
);

exports.build = build;

exports.default = series(build, watchAll);
