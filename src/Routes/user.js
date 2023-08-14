const express = require("express");

const router = express.Router();
const userController = require("../controller/userController")


router.get(
    "/:userId",
    userController.getUser
);

router.put(
    "/:userId",
    userController.updateUser
);

module.exports = router;