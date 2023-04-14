const {Schema,model,Types} = require("mongoose")
const LogPass = new Schema({
    login: {type: String,required: true, unique: true},
    password:{type: String,required: true}
})

module.exports = model("LogPass",LogPass) // имя модели, схема, на основе которой построится сама модель