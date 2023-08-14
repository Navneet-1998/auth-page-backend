const mongoose = require("mongoose")
const mongoURL = "mongodb://localhost:27017/login&register"

const connectToMongo = () => {
    mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to mongoDB successfully");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
}

module.exports = { connectToMongo }