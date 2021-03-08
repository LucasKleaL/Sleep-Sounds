
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

self.addEventListener("fetch", function(evt) {
    console.log("[ServiceWorker] Fetching", evt.request.url);

    evt.respondWith(

        caches.match(evt.request).then(function(response) {

            if (response) {
                console.log("[ServiceWorker] Found in cache", evt.request.url);
                return response;
            }

            var requestClone = evt.request.clone();

            fetch(requestClone)
                .then(function(response) {

                    if (!response) {
                        console.log("[ServicerWorker] No response from fetch")
                        return response;
                    }

                })

            var responseClone = response.clone();

            caches.open(cacheName).then(function(cache) {

                cache.put(e.request, responseClone);
                return response;

            })

        })
        .catch(function(err) {
            console.log("[ServiceWorker] Error Fetching & Caching new version.")
        })

    )
})
       