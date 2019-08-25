const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/product", productRouter);

const handelingerrors = (error, req, res, next) => {
  let data = "";
  let err = error.message;

  if (error.message.message) {
    err = error.message.message;
  }
  if (error.data) {
    data = error.data[0];
  }

  res.status(400).send({
    statusCode: error.statusCode,
    error: err,
    data: data
  });
  console.log(error);
};

app.use(handelingerrors);
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
