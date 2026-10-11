const User = require("../models/user");
const { createHmac, timingSafeEqual } = require("crypto");
const { createWebToken } = require("../services/authentication");

async function handleUserSignup(req, res) {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).send("All fields are required.");
        }

        await User.create({ userName, email, password });

        return res.redirect("/user/signin");
    } catch (error) {
        //here we are testing whether email is duplicate or not
        if (error.code === 11000) {
            return res.status(409).send("Email already exists.");
        }

        console.error(error);
        return res.status(500).send("Something went wrong.");
    }
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

    const token = createWebToken(user);

    console.log(token, "token");

    return res.cookie("token", token).redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserSignin
};