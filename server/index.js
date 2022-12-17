require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFound, errorHandler } = require("./middlewares/errors/errorHandler");
const authRouter = require("./routes/auth_route");
const postRouter = require("./routes/post_route");
const commentRouter = require("./routes/comment_route");
const imageRouter = require("./routes/image_route");
const sequelize = require("./config/sequelize");

const middleware = [
  morgan("dev"),
  cors({
    origin: process.env.CLIENT_URL,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
];

const app = express();

//global middleware
app.use(middleware);

//routes
app.use("/api/v1/", authRouter);
app.use("/api/v1/", postRouter);
app.use("/api/v1/", commentRouter);
app.use("/api/v1/", imageRouter);

//error handler middleware
app.use(NotFound);
app.use(errorHandler);

//port
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port : ${PORT}`);
// });
sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
    console.log("db conneted");
  })
  .catch(() => {
    console.log("db connection field");
  });
