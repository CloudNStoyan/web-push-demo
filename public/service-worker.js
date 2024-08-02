// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-restricted-globals */

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (e) => {
  const message = e.data?.json();
  self.registration.showNotification('Web Push Example App', {
    body: message.body,
    icon: './sad_hamster.jpg',
    image: './sad_hamster.jpg',
    badge: './sad_hamster.jpg',
    data: {
      url: message.url,
    },
  });
});

self.addEventListener('notificationclick', (e) => {
  const urlToOpen = new URL(e.notification.data.url, self.location.origin).href;

  const promiseChain = self.clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient;

      for (const windowClient of windowClients) {
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      }
      return self.clients.openWindow(urlToOpen);
    });

  e.waitUntil(promiseChain);
});
