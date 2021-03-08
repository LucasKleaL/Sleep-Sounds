
 const cacheName = "pwa-cache";

self.addEventListener("install", e => {
    e.waitUntil(
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

self.addEventListener("fetch", function(evt) {
    console.log("Service worker is serving the asset");

    evt.respondWith(fromCache(evt.request));

    evt.waitUntil(
        update(evt.request)

        .then(refresh)
    );
});

function fromCache(request) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request);
    });
}

function update(request) {
    return caches.open(cacheName).then(function (cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response.clone()).then(function() {
                return response;
            });
        });
    });
}
         