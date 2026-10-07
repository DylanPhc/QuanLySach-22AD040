const session = require("express-session");
const { MongoStore } = require("connect-mongo");

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_WRITE_URI,
    collectionName: "sessions",
  }),
  cookie: { maxAge: 1000 * 60 * 60 },
});
