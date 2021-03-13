
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


/* Parte responsavel pelo banner de instalação */ 
       

    function pwaTrackingListeners() {
    const fireAddToHomeScreenImpression = event => {
        fireTracking("Add to homescreen shown");
        //will not work for chrome, untill fixed
        event.userChoice.then(choiceResult => {
            fireTracking(`User clicked ${choiceResult}`);
        });
        //This is to prevent `beforeinstallprompt` event that triggers again on `Add` or `Cancel` click
        window.removeEventListener(
            "beforeinstallprompt",
            fireAddToHomeScreenImpression
        );
    };
    window.addEventListener("beforeinstallprompt", fireAddToHomeScreenImpression);

    //Track web app install by user
    window.addEventListener("appinstalled", event => {
        fireTracking("PWA app installed by user!!! Hurray");
    });

    //Track from where your web app has been opened/browsed
    window.addEventListener("load", () => {
        let trackText;
        if (navigator && navigator.standalone) {
            trackText = "Launched: Installed (iOS)";
        } else if (matchMedia("(display-mode: standalone)").matches) {
            trackText = "Launched: Installed";
        } else {
            trackText = "Launched: Browser Tab";
        }
        fireTracking(track);
    });
}