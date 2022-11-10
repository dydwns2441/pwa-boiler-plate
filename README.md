# Nextjs + Web-push

## Getting Started

### Setup

1. server

```bash
npm i --save

// create web-push publicKey and privateKey
npm run vapid

npm run start
```

2. client

```bash
cd client

npm i --save

npm run dev
```

3. publicKey

- server/vapid.json > `publicKey` > `cmd + c`
- client/home/index.js line:90 > `vapidPublicKey` > `cmd + v`

4. get FCM API key

- Visit Google Firebase Console and create project
- Open Project > Project settings > Cloud Messaging
- Cloud Messaging API > Server Key
- server/push.js line:9 update
