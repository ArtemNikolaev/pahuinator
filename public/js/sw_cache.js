const audioVersion = `audio-v0.0.4`;
const uiVersion = `ui-v0.0.7`;

const uiCache = [
  '/',
  'favicon.ico',
  'manifest.json',
  'images/icon-192x192.png',
  'images/icon-512x512.png',
]
const audioCache = [
  'audio/1.mp3',
  'audio/2.mp3',
  'audio/3.mp3',
  'audio/4.mp3',
  'audio/5.mp3',
  'audio/6.mp3',
  'audio/7.mp3',
]

const installUiCache = caches
  .open(uiVersion)
  .then(cache => cache.addAll(uiCache));

const installAudioCache = caches
  .open(audioVersion)
  .then(cache => cache.addAll(audioCache));

const install = event => event.waitUntil(
  Promise.all([ installUiCache, installAudioCache ])
);

const activate = event => event.waitUntil(
  caches
    .keys()
    .then(cachesNames => cachesNames
      .filter(cacheName => [audioVersion, uiVersion].indexOf(cacheName) === -1)
      .map(cacheName => caches.delete(cacheName)),
    )
    .then(promises => Promise.all(promises))
);

const fetchQ = event => event.respondWith(caches.match(event.request));

self.addEventListener('install', install);
self.addEventListener('activate', activate);
self.addEventListener('fetch', fetchQ);
