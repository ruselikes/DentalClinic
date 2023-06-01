const {Schema,model,Types} = require("mongoose")
const Admin = new Schema({
    login: {type: String,required: true, unique: true},
    password:{type: String,required: true},

    // links: [{type:Types.ObjectId ,ref:"Link"}] //  связь моедли пациента и определенных записей в базе данных + ссылаемся на будущую модель Link
    role: {type:String, default:"админ"},

})

module.exports = model("Admin",Admin) // имя модели, схема, на основе которой построится сама модель