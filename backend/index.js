const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
const { userRouter } = require("./routes/user-routes");
const { blogRouter } = require("./routes/blog-routes");
const cors = require('cors')
const port = 3000;
const MongooseConnect = process.env.MONGO_URL;
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect(MongooseConnect)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

console.log("Jai Sita Ram");
