// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __UNSECURE_VAPID_PUBLIC_KEY__ = 'YOUR_VAPID_PUBLIC_KEY_HERE';

export function askPermission() {
  return Notification.requestPermission();
}

export const reportUnknownError = (error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.register(
    './service-worker.js'
  );

  const subscribeOptions = {
    userVisibleOnly: true,
    endpoint: '/subscription',
    applicationServerKey: __UNSECURE_VAPID_PUBLIC_KEY__,
  };
  const subscription =
    await registration.pushManager.subscribe(subscribeOptions);

  await fetch('http://localhost:3001/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  return subscription;
}
