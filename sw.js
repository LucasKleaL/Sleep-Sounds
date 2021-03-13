
 const cacheName = "pwa-cache2";

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
                "./public/img/ioga_icon.png",
                "./public/img/meditation_icon.png",
                "./public/img/sleep_icon.png",
                "./public/img/facebook_icon.png",
                "./public/img/twitter_icon.png",
                "./public/img/whatsapp_icon.png",
            ])
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});

self.addEventListener("activate", function(evt) {
    console.log("[ServiceWorker] Activated")

    evt.waitUntil(

        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing cached files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }

            }))
        })

    )
})

