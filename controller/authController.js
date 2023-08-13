const httpStatus = require("http-status")
const userControl = require("./userController")
const catchAsync = require("../utils/catchAsync")


const loginUserWithEmailAndPassword = async(email, password, res) => {
    const user = await userControl.getUserByEmail(email)
    console.log(user)
    if (!user || !(await user.isPasswordMatch(password))) {
        return res.status(httpStatus.UNAUTHORIZED).json({ 'message': "Incorrect email or password" })
    }
    return user
}


const register = catchAsync(async(req, res) => {
    const user = await userControl.createUser(req.body, res);
    return res.status(httpStatus.CREATED).send({ user })
})


const login = catchAsync(async(req, res) => {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password, res);
    res.send({ user });
})


module.exports = { register, login }