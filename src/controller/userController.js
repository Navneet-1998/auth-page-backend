const { User } = require("../model/userModel");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const getUserById = async(id) => {
    return User.findById(id);
};


const getUserByEmail = async(email) => {
    console.log(email)
    return User.findOne({ email });
};

const createUser = async(userBody, res) => {
    console.log(await User.isEmailTaken(userBody.email))
    if (await User.isEmailTaken(userBody.email)) {
        return res.status(httpStatus.FORBIDDEN).send({ 'message': "This email has already taken!" })
    }
    const user = await User.create(userBody);
    return user;
};


const getUser = catchAsync(async(req, res) => {
    let data;
    data = await getUserById(req.params.userId);


    if (!data) {
        return res.status(httpStatus.NOT_FOUND).json({ 'message': "User not found" })
    }

    res.send(data);

});

const updateUser = catchAsync(async(req, res) => {
    let data;
    data = await getUserById(req.params.userId);
    if (!data) {
        return res.status(httpStatus.NOT_FOUND).json({ 'message': "User not found" })
    }

    const updates = req.body
    if (updates.password) {
        data.password = updates.password;
    }

    if (updates.name) {
        data.name = updates.name;
    }



    await data.save();
    res.send(data)
})

module.exports = {
    getUser,
    createUser,
    getUserByEmail,
    updateUser
};