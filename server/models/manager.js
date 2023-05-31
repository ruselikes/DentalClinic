const {Schema,model,Types} = require("mongoose")
const Manager = new Schema({
    email: {type: String,required: true, unique: true},
    password:{type: String,required: true},
    name: {type: String,required: true},
    surname: {type: String,required: true},
    middlename:{type: String,required: false},
    // links: [{type:Types.ObjectId ,ref:"Link"}] //  связь моедли пациента и определенных записей в базе данных + ссылаемся на будущую модель Link
    role: {type:String, default:"менеджер"},

})

module.exports = model("Manager",Manager) // имя модели, схема, на основе которой построится сама модель