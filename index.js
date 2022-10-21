// index.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const server = async () => {
  try {
    const { PORT, MONGO_URL } = process.env;
    if (!PORT) throw new Error("PORT is required. ");
    if (!MONGO_URL) throw new Error("MONGO_URL is required. ");

    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected. ");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 라우터 추가

    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}. `);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
