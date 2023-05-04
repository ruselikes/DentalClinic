const jwt = require('jsonwebtoken')
const config = require("config");
const secret = config.get("secret")

module.exports = function() {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован. Нет доступа"})
            }
            const decodedData = jwt.verify(token, secret)
            console.log(decodedData)
            req.user = decodedData
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован. Нет доступа"})
        }
    }

};