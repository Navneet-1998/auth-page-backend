require('dotenv').config();
const { connectToMongo } = require('./db.js')
const express = require('express')

const cors = require('cors'); // Import the cors package
connectToMongo();


const app = express();
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
    console.log(`Listening to port http://localhost:${port}`);
});