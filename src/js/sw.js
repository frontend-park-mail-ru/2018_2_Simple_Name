var APP_CACHE = 'app-cache';

//Кэшируем
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(function(cache) {
        return cache.addAll(['/index.js', '/index.html', '/b3f5e82c46a8e0cd2d7a8b5dce47a084.png']);
      })
  );
});

// Ответ из кэша
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) { // если страница нашлась в кеше
				return response;
			}
			return fetch(event.request).then((response) => { // если страницы нет в кеше и есть сеть то делаем запрос
				let shouldCache = response.ok;
				if (event.request.method === 'POST') { // проверка так как post unsupported
					shouldCache = false;
				}

				if (shouldCache) { // кладем копию ответа в кеш
					return caches.open(APP_CACHE).then((cache) => {
						cache.put(event.request, response.clone());
						return response;
					});
				} else {
					return response;
				}
			}).catch((err) => {
				console.log('Network error', err);
			});
		})
	);
});