if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw_cache.js')
    .catch(console.error);
}

const audioArr = [
  new Audio('audio/1.mp3'),
  new Audio('audio/2.mp3'),
  new Audio('audio/3.mp3'),
  new Audio('audio/4.mp3'),
  new Audio('audio/5.mp3'),
  new Audio('audio/6.mp3'),
  new Audio('audio/7.mp3'),
]

function run(num) {
  audioArr[num].play();
}
