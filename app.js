const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(morgan("dev"));

// Body Parser, Reading Data From Body Into Req.Body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
});

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

module.exports = app;
