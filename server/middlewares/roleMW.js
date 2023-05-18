const jwt = require('jsonwebtoken')
const config = require("config");
const secret = config.get("secret")
module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "rMWПользователь не авторизован. Авторизируйтесь!"})
            }
            let {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            // console.log(userRoles)
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                    // req.userinfo()
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа к странице. Нужно обладать правами администратора"})
            }
            const decodedData = jwt.verify(token, secret)
            // console.log(decodedData)
            // req.user = decodedData
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Произошла ошибка в roleMW"})
        }
    }
};