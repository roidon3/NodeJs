const { validateToken } = require("../services/authentication");

function checkForAuthentication(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/user/signin");
    }

    const user = validateToken(token);

    req.user = user;

    next();
}

module.exports = {
    checkForAuthentication
};