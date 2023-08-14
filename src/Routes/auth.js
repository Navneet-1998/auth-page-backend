const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

// TODO: CRIO_TASK_MODULE_AUTH - Implement "/v1/auth/register" and "/v1/auth/login" routes with request validation
router.post(
    "/register",
    authController.register
);

router.post("/login",
    authController.login
);

module.exports = router;