const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// CacheableResponsePlugin

// Define a route to cache responses
registerRoute(
  // This matches any requests that end in .jpg, .png, .svg, .mp3, or .json
  ({request}) => request.destination === 'style' ||
                request.destination === 'script' ||
                request.destination === 'worker',

  // Use the CacheFirst strategy with the CacheableResponsePlugin
  new CacheFirst({
    cacheName: 'my-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]  // Cache responses with status codes 0 and 200
      })
    ]
  })
);






registerRoute();
