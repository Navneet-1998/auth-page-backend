const mongoose = require("mongoose")
const { Schema } = mongoose
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(
                    "Invail Email!"
                )
            }
        },
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        validate(value) {
            if (!value) {
                throw new Error(
                    "Password must contain at least letter or number"
                );
            }
        },
        required: true,
        trim: true,
        minlength: 5,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.statics.isEmailTaken = async function(email) {
    const user = await this.findOne({ email });
    return !!user;
}

userSchema.methods.isPasswordMatch = async function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model("user", userSchema)
    // User.createIndexes();

module.exports = { User }