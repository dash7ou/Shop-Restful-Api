const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27018/shop-restful-api", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(_ => {
    console.log("Connect to mongoose port: 27018");
  })
  .then(_ => {
    const port = 3000 || process.env.PORT;
    app.listen(port, () => {
      console.log(`server run port: ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

/**
 * user
 * order
 * product
 *
 */
