const Storage = require("node-storage");

const store = new Storage(`${__dirname}/db`);
let cards = store.get("cards") || [];

module.exports.addPost = (data) => {
  cards.push(data);

  store.put("posts", cards);
};

module.exports.getPosts = () => cards;
