const { Router } = require("express");
const router = Router();

const {
    handleUserSignup,
    handleUserSignin
} = require("../controller/user");

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.post("/signin", handleUserSignin);

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signup", handleUserSignup);

module.exports = router;