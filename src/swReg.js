// Регистрируем sw
if ('serviceWorker' in navigator) {
    // console.log('Зашёл в навигатор');
    navigator.serviceWorker.register('/sw.js')
        .then(() => navigator.serviceWorker.ready.then((reg) => {
            reg.sync.register('data');
            if(reg.installing) {
                console.log('Service worker installing');
              } else if(reg.waiting) {
                console.log('Service worker installed');
              } else if(reg.active) {
                console.log('Service worker active');
              }
            console.log('ServiceWorker reg success ');
        }))
        .catch((err) => console.log('ServiceWorker registration failed: ', err));
}