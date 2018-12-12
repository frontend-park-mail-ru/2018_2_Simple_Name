// Регистрируем sw
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => navigator.serviceWorker.ready.then((worker) => {
            worker.sync.register('syncdata');
            console.log('ServiceWorker registration success');
        }))
        .catch((err) => console.log('ServiceWorker registration failed: ', err));
}