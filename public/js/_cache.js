if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw_cache.js')
    .catch(console.error);
}
