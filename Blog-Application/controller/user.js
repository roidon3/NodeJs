const User = require("../models/user");
const { createHmac, timingSafeEqual } = require("crypto");

async function handleUserSignup(req, res) {
    const { userName, email, password } = req.body;

    await User.create({
        userName,
        email,
        password
    });

    return res.redirect("/user/signin");
}

async function handleUserSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    const hashedPassword = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    const passwordMatches = timingSafeEqual(
        Buffer.from(user.password, "hex"),
        Buffer.from(hashedPassword, "hex")
    );

    if (!passwordMatches) {
        return res.status(401).send("Invalid email or password");
    }

    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserSignin
};