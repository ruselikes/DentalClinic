const User = require('./models/pacient')
const Role = require('./models/role')
const Pacient = require("./models/pacient");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
class authController{
    async registration(req,res){

        try{
            const {email,password,name,surname,roles} = req.body

            const candidate = await Pacient.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message:"Пользователь с таким E-mail уже зарегистрирован в системе."})
            }
            const hashedPassword =await bcrypt.hash(password,12)
            const new_pacient = new Pacient ({email:email,password: hashedPassword,surname,name,roles})
            await new_pacient.save()
            res.status(201).json({message:"Пациент добавлен систему",user:new_pacient})
        }
        catch(e){
        res.status(500).json({message:"На моем сервер что то не так. tg: trimberg",error: e.message})
        }
    }
    async login(req,res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоректные данные при входе в систему"
                })
            }
            const {email,password} = req.body
            const pacient = await Pacient.findOne({email:email})

            if (!pacient){
                return res.status(400).json({message:"Пользователь не найден."})
            }
            const isMatch = await bcrypt.compare(password,pacient.password)
            // const isMatch = password == "$2a$12$Mv3Frphsq0X87p0Vv4aaZeNbI7HBSR/iKcTxCPiz9wya6PdLoSuBm"

            if (!isMatch){
                return  res.status(400).json({message:"Неверный пароль."})
            }
            return res.json({message: "успешно вошел красава"})


        }catch {

        }
    }
    async getUsers(req,res){
        try{
            const users = await Pacient.find()
            return res.json(users)
        }
        catch (e) {
            return res.status(400).json({message: "Что то не так",error:e.message})
        }
    }
}
module.exports = new authController()
