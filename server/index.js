const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow Next.js frontend to access this API
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://anupraj1854:18NK3fCAO4UoBPAS@todocluster.9ag2fzh.mongodb.net/?retryWrites=true&w=majority&appName=todocluster"
  )
  .then(console.log("mongodb connected"));

app.get("/api/todolist", (req, res) => {
  console.log("request accesss");
  res.json({ message: "Anupraj" });
});

app.listen(PORT, () => console.log("server is started"));
