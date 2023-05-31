const {Schema,model,Types} = require("mongoose")
const Doctor = new Schema({
    email: {type: String,required: true, unique: true},
    password:{type: String,required: true},
    name: {type: String,required: true},
    surname: {type: String,required: true},
    middlename:{type: String,required: false},
    // links: [{type:Types.ObjectId ,ref:"Link"}] //  связь моедли пациента и определенных записей в базе данных + ссылаемся на будущую модель Link
    roles: {type:String, default:"доктор"},
    position:{type:String, default:"Стоматолог"},
    exp:{type:String, default:"3"},
})


module.exports = model("Doctor",Doctor) // имя модели, схема, на основе которой построится сама модель