import React, { useEffect, useCallback, useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 36px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  > button {
    height: 45px;
    width: 100px;
    border-radius: 5px;
    font-size: 18px;
    font-family: "Nanum Gothic";
  }

  > button:nth-of-type(1) {
    border: 1px solid #3399ff;
    color: #3399ff;
    background-color: #fff;
  }
  > button:nth-of-type(2) {
    border: none;
    color: #fff;
    background-color: #3399ff;
  }

  > div {
    font-size: 24px;
  }
`;

const urlBase64ToUint8Array = (base64String) => {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const Index = () => {
  const [hasPermission, setHasPermission] = useState("");

  // notification 기능
  const displayConfirmNotification = () => {
    if (!("serviceWorker" in navigator)) return;
    const title = "Welcome to PWA DEMO";
    const options = {
      body: "You successfully subscribed to our notification",
      icon: "/images/logo-192.png",
      image: "/images/logo-192.png",
      dir: "ltr",
      lang: "ko-KR",
      vibrate: [100, 50, 200],
      badge: "/images/logo-192.png",
      tag: "confirm-notification",
      actions: [
        { action: "confirm", title: "Okay", icon: "/images/logo-192.png" },
        { action: "cancel", title: "Cancel", icon: "/images/logo-192.png" },
      ],
    };
    navigator.serviceWorker.ready.then((swreg) => {
      swreg.showNotification(title, options);
    });
  };
  // 구독 조회 및 생성
  const configurePushSub = useCallback(() => {
    // 기술적으로 지원하지 못하면 접근 불가
    if (!("serviceWorker" in navigator)) return;

    let reg;

    navigator.serviceWorker.ready
      .then(function (swerg) {
        // 해당 브라우저의 구독정보가 있는지 확인
        reg = swerg;
        return swerg.pushManager.getSubscription();
      })
      .then(function (sub) {
        // 없다면 새로운 구독 만들기
        if (sub === null) {
          let vapidPublicKey =
            "BMfchR5Dc44BbOPbDmdyMGnKbCaPbmnAIq9xfpURUkqf9jBVpg6aH0h1HFv3N4AyBzdhTIGU4MsZMd2KNcBsFyg";
          let applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          });
          // 구독이 존재하는 경우
        } else {
          alert("이미 구독이 있습니다.");
        }
      })
      .then(function (newSub) {
        return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/subscribe`, {
          method: "POST",
          body: JSON.stringify(newSub),
        });
      })
      .then(function (res) {
        if (res.ok) {
          displayConfirmNotification();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const askForNotificationPermission = useCallback(() => {
    Notification.requestPermission((result) => {
      console.log(result);
      // 권한 요청 거절시
      if (result !== "granted") return;
      // 권한 요청 수락시
      configurePushSub();
      setHasPermission(result);
    });
  }, [configurePushSub]);

  useEffect(() => {
    // notification 이 가능한지 확인 후 버튼 생성
    const enableButton = document.querySelectorAll(".enable-notification");

    if ("Notification" in window) {
      for (let i = 0; i < enableButton?.length; i++) {
        enableButton[i].style.display = "inline-block";
        enableButton[i].addEventListener("click", askForNotificationPermission);
      }
      setHasPermission(Notification.permission);
    }
  }, [askForNotificationPermission]);

  return (
    <Container>
      <div>Notification permission: {hasPermission}</div>
      <button className="enable-notification">권한 요청</button>
    </Container>
  );
};

export default Index;
