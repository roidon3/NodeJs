const JWT = require("jsonwebtoken");

const secret = "mySecret@123";

function createWebToken(user) {
    const payload = {
        _id: user.id,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        role: user.role,
    }
    const token = JWT.sign(payload, secret)
    return token;
}
function validateToken(token) {
    const payload = JWT.verify(token, secret)
    return payload
}
module.exports = {
    createWebToken,
    validateToken
}