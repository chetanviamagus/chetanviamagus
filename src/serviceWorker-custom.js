importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const PATHS_TO_CACHE = {};

//Version - 1.0

// Global workbox
if (workbox) {
  console.log("Workbox is loaded");

  // Disable logging
  //workbox.setConfig({ debug: false });

  // Updating SW lifecycle to update the app after user triggered refresh
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

  workbox.core.clientsClaim();
  // Manual injection point for manifest files.
  // All asset under build/ and 5MB sizes are precached.
  workbox.precaching.precacheAndRoute([]);

  const { strategies } = workbox;
  const { registerRoute, setCatchHandler } = workbox.routing;
  const { CacheFirst } = workbox.strategies;
  const { CacheableResponse } = workbox.cacheableResponse;

  workbox.routing.registerRoute(
    // This will return true for navigation requests, causing the route to match.
    ({ event }) => event.request.mode === "navigate",
    // Customize this handler with whatever options you need.
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(({ url }) => {
    console.log(
      "[Service Worker] VM_API Check: ",
      url,
      " Caching=",
      new RegExp(".*/custom/api/.*").test(url.href)
    );
    return new RegExp(".*/custom/api/.*");
  }, new workbox.strategies.NetworkFirst());

  self.addEventListener("fetch", (e) => {
    console.log("[Service Worker] Fetched resource " + e.request.url);
  });

  workbox.routing.registerRoute(({ url }) => {
    console.log(
      "[Service Worker] Image Check: ",
      url,
      " Caching=",
      url.pathname.endsWith(".png|.svg|.jpg|.jpeg")
    );
    return url.pathname.endsWith(".png|.svg|.jpg|.jpeg");
  }, new workbox.strategies.CacheFirst());

  workbox.routing.registerRoute(({ url }) => {
    console.log(
      "[Service Worker] from CDN: ",
      url,
      " Caching=",
      new RegExp("https://viamagus\\.b-cdn\\.net/.*(.png|.svg|.jpg|.jpeg)").test(url.href)
    );
    return new RegExp("https://viamagus\\.b-cdn\\.net/.*(.png|.svg|.jpg|.jpeg)");
  }, new workbox.strategies.CacheFirst());

  workbox.routing.registerRoute(({ url }) => {
    console.log(
      "[Service Worker] Custom API check: ",
      url,
      " Caching=",
      url.pathname.startsWith("/custom/api/")
    );
    return url.pathname.startsWith("/custom/api/");
  }, new workbox.strategies.NetworkFirst());

  setCatchHandler(({ url, event, params }) => {
    console.log("[Service Worker] Unable to fetch resource " + url);
    if (event.request.mode === "navigate") {
      console.log("[Service Worker] Unable to fetch resource FOR NAVIGATION: " + url);
      // return caches.match("/dashboard/console");
      let response = Response.redirect("/dashboard/console", 302);
      //self.location = '/dashboard/console';
      //event.respondWith(response);
      return response;
    }
  });

  // Font caching
  /* workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
      workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30,
          }),
        ],
      })
    ); */
} else {
  console.error("Workbox could not be loaded. No offline support");
}
