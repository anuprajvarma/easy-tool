const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routers/auth");
const todoRoute = require("./routers/todo");
const dbConnection = require("./connections/dbConnection");

const app = express();
const PORT = 5001;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow Next.js frontend to access this API
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dbConnection(
  "mongodb+srv://anupraj1854:18NK3fCAO4UoBPAS@todocluster.9ag2fzh.mongodb.net/?retryWrites=true&w=majority&appName=todocluster"
);

app.use("/api/auth", authRoute);

app.use("/api", todoRoute);

app.listen(PORT, () => console.log("server is started"));
