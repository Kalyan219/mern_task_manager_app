const express = require("express")
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./connection/connection")

const userApis = require("./controllers/user")
const taskApis = require("./controllers/task")

PORT = process.env.PORT || 1000
app.use(express.json())
app.use(cors({
    origin:"https://taskify-managing.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//apis
app.use("/api/v1", userApis)
app.use("/api/v1", taskApis)


app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})