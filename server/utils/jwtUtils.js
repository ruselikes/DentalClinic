const jwt = require('jsonwebtoken');
// const config = require("config");
// const secret = config.get("secret")
const decodeAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token,"mnemonic_phrase");
        return decoded;
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error.message);
        return null;
    }
};

module.exports = { decodeAccessToken };