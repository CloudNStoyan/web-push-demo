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
    applicationServerKey:
      'BL7ZS10KrRemDU7XhyeNk8FsRQmwzzQ3UwnZxUlHk-EPFNSf0l0SbgcRKSgnkZ4WhcHBx386Gv2kIuXKsFmeny4',
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
