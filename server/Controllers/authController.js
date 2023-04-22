const User = require('../models/pacient')
const Role = require('../models/role')
const Pacient = require("../models/pacient");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const config = require("config");
const secret = config.get("secret")
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}
class authController{
    async registration(req,res){

        try{
            const {email,password,name,surname,roles} = req.body

            const candidate = await Pacient.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message:"Пользователь с таким E-mail уже зарегистрирован в системе."})
            }
            const hashedPassword =await bcrypt.hash(password,2)
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
            // const isMatch = password == pacient.password

            if (!isMatch){
                return  res.status(400).json({message:"Неверный пароль."})
            }
            const token = generateAccessToken(pacient._id, pacient.roles)
            return res.json({message:"Вошли",token:token})


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
    async getMe(req,res){
        try{
            const user = await Pacient.findById(req.user.id)
            console.log(user)
            return res.json({
                user
            })
        }
        catch (e){
            return res.status(400).json({message: "Что то не так",error:e.message})

        }
    }

}
module.exports = new authController()
