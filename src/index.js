require('dotenv').config();
const mongoose = require("mongoose")
const express = require('express')
const cors = require('cors'); // Import the cors package

const app = express();

const mongoURL = process.env.MONGODB_URL;
const port = process.env.PORT

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    console.log("hello world")
    res.send("hello world")
})

app.get('/hi', (req, res) => {
    console.log("hello world")
    res.status(200).json({ 'message': "hello man" })
})

app.use("/api/auth", require("./Routes/auth"))
app.use("/api/user", require("./Routes/user"))


app.listen(port, () => {
    mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to mongoDB successfully");
            console.log(`Listening to  http://localhost:${port}`);
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
})