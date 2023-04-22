const {Schema,model,Types} = require("mongoose")
const Role = new Schema({
    value:{type:String,unique:true,default:"pacient"}



})

module.exports = model("Role",Role) // имя модели, схема, на основе которой построится сама модель