self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installing Service Worker ...", e);
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activating Service Worker ....", e);
  return self.clients.claim();
});

self.addEventListener("notificationclick", (e) => {
  var notification = e.notification;
  var action = e.action;

  if (action === "confirm") {
    console.log("Confirm was chosen");
    notification.close();
  } else {
    console.log(action);
    notification.close();
  }
});

self.addEventListener("notificationclose", (e) => {
  console.log("Notification was closed", e);
});

self.addEventListener("push", (e) => {
  const message = e.data.json();
  self.registration.showNotification(message.title, {
    body: message.body,
  });
});
