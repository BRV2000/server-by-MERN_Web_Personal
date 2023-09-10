const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require ("../constants");

function createAccessToken(user) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);//Modificacion del cap 41, don se habia puesto setHours

    const payload = {
        token_type: "access",
        user_id: user._id, //Modificacion del cap 41, donde se habia puesto user_id: user.user_id
        iat: Date.now(),
        exp: expToken.getTime()

    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user){
    const expToken = new Date();
    expToken.getMonth(expToken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),

    };

    return jwt.sign(payload, JWT_SECRET_KEY);

}

function decoded(token){
    return jwt.decode(token, JWT_SECRET_KEY,true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded,
};