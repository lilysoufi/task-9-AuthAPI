require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const cookies = require("cookie-parser");
const xssSanitize = require("./middlewares/xss");
const { limiter } = require("./middlewares/limiter");
const cors = require("cors");

app.use(cors({
    origin: true,
    credentials: true //Allows cookies to be sent and received
}));

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("dev"));
app.use(cookies());
app.use(xssSanitize);
app.use(express.static("public"));


app.get("/api/health", (req, res) => res.status(200).json("API is Healthy"));
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/", require("./routes/protected.routes"));

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to database successfully")
        app.listen(PORT, () => {
            console.log("Server is running successfully");
        })
    })
    .catch(err => {
        console.log("Mongodb Error:", err.message);
    })