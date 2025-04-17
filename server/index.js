const express = require("express");
const app = express();
require("dotenv").config();
const port = 5000;
const adminMiddlewares = require("./middlewares/admin.middlewares");
const errorMiddlewares = require("./middlewares/error.middlewares");
const cookieParser = require("cookie-parser");



app.use(cookieParser());
app.use(express.json());
const cors = require("cors");
const allowedOrigins = [
  'http://localhost:3000',
  'https://v2-nurbek-codes.vercel.app',
  'https://nurbek.codes',
  'https://www.nurbek.codes'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
app.use(helmet());
app.use(morgan("dev"));

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 200,
//     standardHeaders: true,
//     legacyHeaders: true,
//     message: 'Too many requests, please try again later'
// })
// app.use(limiter);

app.use("/api/admin", require("./routes/admin"));
app.use("/api/blog", require("./routes/blog"));
app.use("/api/projects", require("./routes/projects"));

app.use(errorMiddlewares);
app.use(adminMiddlewares.verifyToken);
app.use(adminMiddlewares.isAdmin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
