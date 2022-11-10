const webpush = require("web-push");
const Storage = require("node-storage");

// Vapid Keys
const vapid = require("./vapid.json");
// web-push 라이브러리를 통해 아주 간단히 발송 코드를 구현할 수 있다.
// FCM 서버키 -> setting -> 클라우드 메시징 서버키 복사
webpush.setGCMAPIKey(
  "AAAAKFj43bs:APA91bHzIPp98jo5cg9cnsxhJdSs4NhaB9wsStxcMqnZgFJ6AiZ0PmdSwx029w0DmRhlsjaVlxzGkmi62vJ9Xmr81qtUG-ngZ-W3Dyy40ig8X8wT0-F_EBVjRwKaWWPTJlzjyjRvFLHv"
);
webpush.setVapidDetails(
  "mailto:heoyjun6@gmail.com",
  vapid.publicKey,
  vapid.privateKey
);

const store = new Storage(`${__dirname}/db`);
let subscriptions = store.get("subscriptions") || [];

module.exports.addSubscription = (subscription) => {
  subscriptions.push(subscription);
  store.put("subscriptions", subscriptions);
};

module.exports.sendPushMessage = (message) => {
  let notifications = [];

  subscriptions.forEach((subscription, i) => {
    let p = webpush.sendNotification(subscription, message).catch((status) => {
      // 실패시 410 - Gone status를 가진다. 체크하여 삭제
      if (status.statusCode === 410) subscriptions[i]["delete"] = true;
      return null;
    });

    notifications.push(p);
  });

  Promise.all(notifications).then(() => {
    subscriptions = subscriptions.filter(
      (subscription) => !subscription.delete
    );
    // 삭제 후 subscriptions 업데이트
    store.put("subscriptions", subscriptions);
  });
};
