const express = require("express");
const app = express();
const authRoute = require("./routers/auth");
const postsRoute = require("./routers/posts");
const usersRoute = require("./routers/users");
const cors = require("cors");

require("dotenv").config;

const PORT = procsee.env.Port || 10000;

app.use(cors());

//expressの設定(json形式を使用する)
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use("/api/posts/", postsRoute);
app.use("/api/users/", usersRoute);

app.listen(PORT, () => console.log("server is running on Port ${PORT}"));
