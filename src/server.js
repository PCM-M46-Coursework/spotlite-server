require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 5001;

const userRouter = require("./users/routes");
const User = require("./users/model");
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.json());

const syncTables = () => {
    User.sync()
};

app.use(userRouter);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "API is online"});
});

app.listen(port, () => {
    syncTables()
    console.log(`Server is running on port ${port}`)
});
