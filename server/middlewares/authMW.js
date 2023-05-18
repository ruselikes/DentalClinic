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
                return res.status(403).json({message: "aMW.Пользователь не авторизован. Нет доступа",token:token,auth: req.headers.authorization})
            }
            const decodedData = jwt.verify(token, secret)
            console.log("Из authMW",decodedData)
            req.user = decodedData
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "ОШибочный в aMWПользователь не авторизован. Нет доступа"})
        }
    }

};
