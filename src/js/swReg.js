// Регистрируем sw
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => navigator.serviceWorker.ready.then((worker) => {
            worker.sync.register('syncdata');
            console.log('ServiceWorker registration success');
        }))
        .catch((err) => console.log('ServiceWorker registration failed: ', err));
}

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('/sw.js', { scope: '/' })
// 		.then(function (registration) {
// 			console.log('SW registration OK:', registration);
// 		})
// 		.catch(function (err) {
// 			console.log('SW registration FAIL:', err);
// 		});
// }