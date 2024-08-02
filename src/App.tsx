import { type JSX, useCallback } from 'react';

import logoUrl from 'src/logo.png';
import { formatDate } from '~helpers';
import { reportUnknownError, subscribeUserToPush } from '~utils';

export const App = (): JSX.Element => {
  const subscribeToPushNotifications = useCallback(() => {
    void (async () => {
      try {
        await Notification.requestPermission();
      } catch (error) {
        reportUnknownError(error);
      }

      try {
        const subscription = await subscribeUserToPush();

        // eslint-disable-next-line no-console
        console.log('App | subscription', subscription);
      } catch (error) {
        reportUnknownError(error);
      }
    })();
  }, []);

  return (
    <div className="text text-center">
      <div>Hello Vite</div>
      <div data-testid="date-label">{formatDate(new Date())}</div>
      <button type="button" onClick={subscribeToPushNotifications}>
        Subscribe to Push Notifications
      </button>
      <div>
        <img src={logoUrl} alt="logo" />
      </div>
    </div>
  );
};
