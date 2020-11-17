function generateButtons() {
  const audioArr = audioLinks.map(link => new Audio(link));
  const contentArr = [];

  audioArr.forEach((sound, i) => {
    const el = btn.content.firstChild.cloneNode(true);

    el.setAttribute('id', getBoxId(i));
    el.style.setProperty('top', `${7 + i * 10 + i}%`);
    el.setAttribute(
      'class',
      `btn ${i % 2 === 0 ? 'btn-left' : 'btn-right'}`,
    );
    el.addEventListener('click', () => {
      sound.play();
    });

    contentArr.push(el);
  });

  wrapper.append(...contentArr);

  onResize();
}

function onResize() {
  const h = window.innerHeight;
  const w = window.innerWidth;

  calculateBtnSizes(
    h,
    w > h ? h * .75 : w,
  )
}

function calculateBtnSizes(height, width) {
  wrapper.style.setProperty('width', width);
  wrapper.style.setProperty('height', height);

  const { w, h } = clcBtnSize(width, height)
  const viewBox = clcViewBox(w, h);
  const leftPolygonPoints = clcLeftPolygonPoints(w, h);
  const rightPolygonPoints = clcRightPolygonPoints(w, h);

  audioLinks.forEach((link, i) => {
    const el = window[getBoxId(i)];
    el.setAttribute('viewBox', viewBox)
    el.style.setProperty('width', w)
    el.style.setProperty('height', h);
    el.querySelector('polygon').setAttribute(
      'points',
      i % 2 === 0 ? leftPolygonPoints : rightPolygonPoints,
    );
  })
}

function clcViewBox(w, h) {
  return `0 0 ${ w } ${ h }`;
}

function clcBtnSize(w, h) {
  return  {
    h: h * .2,
    w: w * .45,
  }
}

function clcLeftPolygonPoints (w, h) {
  return `
    0,            0
    ${ .8 * w },  0
    ${ w },       ${ .5 * h }
    ${ .8 * w },  ${ h }
    0,            ${ h }
  `;
}

function clcRightPolygonPoints (w, h) {
  return `
    ${ .2 * w }, 0
    ${ w },      0
    ${ w },      ${ h }
    ${ .2 * w }, ${ h }
    0,           ${ .5 * h }
  `;
}

function getBoxId(index) {
  return `box-${index}`;
}
