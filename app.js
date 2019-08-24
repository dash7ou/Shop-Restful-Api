const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user");

app.use(bodyParser.json());
app.use("/users", userRouter);

const handelingerrors = (error, req, res, next) => {
  res.status(400).send({
    statusCode: error.statusCode,
    error: error.message.message,
    data: error.data
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
