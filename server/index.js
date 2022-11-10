// Modules
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const push = require("./push");
const posts = require("./posts");

const PORT = 8081;

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 게시물 리스트 조회
app.get("/posts", (req, res) => {
  let list = posts.getPosts();
  res.end(JSON.stringify(list));
});

// 구독 추가
app.post("/subscribe", (req, res) => {
  let body = [];
  // Read body stream
  req
    .on("data", (chunk) => body.push(chunk))
    .on("end", () => {
      let subscription = JSON.parse(body.toString());
      push.addSubscription(subscription);
      res.end("Subscribed");
    });
});

// 게시물 추가
app.post("/posts", (req, res) => {
  let body = [];
  req
    .on("data", (chunk) => body.push(chunk))
    .on("end", () => {
      posts.addPost(body.toString());
      res.end("posted!!!");
    });
});

// 푸시메시지 보내기
app.post("/push", (req, res) => {
  let body = [];

  // Read body stream
  req
    .on("data", (chunk) => body.push(chunk))
    .on("end", () => {
      //send notification with POST bodu
      push.sendPushMessage(body.toString());
      res.end(`Receive body: hello world`);
    });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
