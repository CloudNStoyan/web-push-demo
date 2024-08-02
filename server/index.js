import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import webpush from 'web-push';

// eslint-disable-next-line no-underscore-dangle
const __UNSECURE_VAPID_PRIVATE_KEY__ = 'YOUR_VAPID_PRIVATE_KEY_HERE';

// eslint-disable-next-line no-underscore-dangle
const __UNSECURE_VAPID_PUBLIC_KEY__ = 'YOUR_VAPID_PUBLIC_KEY_HERE';

webpush.setVapidDetails(
  'mailto:example@localhost',
  __UNSECURE_VAPID_PUBLIC_KEY__,
  __UNSECURE_VAPID_PRIVATE_KEY__
);

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3001;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

const subscriptionsDb = [];

app.post('/subscription', (req, res) => {
  const subscription = req.body;

  subscriptionsDb.push(subscription);

  res.json(subscription);
});

app.post('/send-notification', async (req, res) => {
  const { subscription, message } = req.body;

  console.log('index | subscription', subscription);

  console.log('index | message', message);

  await webpush.sendNotification(
    subscription,
    JSON.stringify({ body: message })
  );

  res.send('Done!');
});

app.get('/subscription/all', (_req, res) => {
  res.json(subscriptionsDb);
});

app.listen(port, () => {
  console.log(`Web Push Example backend running on port: ${port}`);
});
