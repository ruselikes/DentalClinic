const {Schema,model,Types} = require("mongoose")
const User = new Schema({
    email: {type: String,required: true, unique: true},
    password:{type: String,required: true},
    role: {type:String},
    userId: {type: Types.ObjectId}
})

module.exports = model("User",User) // имя модели, схема, на основе которой построится сама модель