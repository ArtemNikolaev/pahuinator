const {
  series,
  parallel,
} = require('gulp');

function moveAudio(cb) {
  cb();
}

function styles(cb) {
  cb();
}

function code(cb) {
  cb();
}

function html(cb) {
  cb();
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
