
 const cacheName = "pwa-cache";

self.addEventListener("install", evt => {
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./css/global.css",
                "./css/home.css",
                "./js/jquery-3.5.1.js",
                "./js/homeScript.js",
                "./public/logo.png",
                "./public/img/back_button.png",
                "./public/img/next_button.png",
                "./public/img/play_button.png",
                "./public/img/pause_button.png",
                "./public/img/smooth_rain.png",
                "./public/img/heavy_rain.png",
                "./public/img/heavy_thunder_rain.png",
                "./public/sounds/smoothRain.mp3",
                "./public/sounds/heavyRain.mp3",
                "./public/sounds/thunderRain.mp3",
                "./public/img/ioga_icon.png",
                "./public/img/meditation_icon.png",
                "./public/img/sleep_icon.png",
            ])
        })
    )
})

self.addEventListener("activate", evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener("fetch", evt => {

    if (!(evt.request.url.indexOf('http') === 0)) return;

    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicNames).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicNames, 75);
                    return fetchRes;
                })
            });
        })
        .catch(() => caches.match("/fallback"))
    );
});

//cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}
         