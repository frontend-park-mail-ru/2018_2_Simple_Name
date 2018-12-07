importScripts('./swCache.js');

var APP_CACHE = 'app-cache';
// var GAME_CACHE = 'game-cache'

//Кэшируем
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(function(cache) {
        return cache.addAll([...pathCache]);
      })
  );
});

//Ответ из кэша
self.addEventListener('fetch', (event) =>
    event.respondWith(fromCache(event.request))
);


function fromCache(request) {
    return caches.open(APP_CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}