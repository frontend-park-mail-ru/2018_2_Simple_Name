var CACHE_NAME = 'simplename-cache';
var urlsToCache = [
  '/',
  '../index.html',
  '../static/css/main.css',
  '../static/css/gamestyles.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  //Установка SW
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// self.addEventListener('install', (event) => {
//     console.log('Установлен');
// });

// self.addEventListener('activate', (event) => {
//     console.log('Активирован');
// });

// self.addEventListener('fetch', (event) => {
//     console.log('Происходит запрос на сервер');
// });