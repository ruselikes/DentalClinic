const User = require('../models/pacient')
const Role = require('../models/role')
const Doctor = require("../models/doctor");
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
    return jwt.sign(payload, secret, {expiresIn: "1h"} )
}

class doctorController{
    async registration(req,res){

        try{
            const {email, password, name, surname, middlename, roles} = req.body

            const candidate = await Pacient.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message:"Пользователь с таким E-mail уже зарегистрирован в системе."})
            }
            const hashedPassword =await bcrypt.hash(password,2)
            const new_pacient = new Pacient ({email:email,password: hashedPassword,surname:surname,name:name,middlename:middlename,roles:roles})
            await new_pacient.save()
            if (req.body.roles.includes("admin")){
                res.status(201).json({message:"Админ добавлен систему",user:new_pacient})
            }
            else if (req.body.roles.includes("pacient")){
                res.status(201).json({message:"Пациент добавлен систему",user:new_pacient})
            }
        }
        catch(e){
            res.status(500).json({message:"На моем серверe (при регистрации) что то не так. tg: trimberg",error: e.message})
        }
    }
    async login(req,res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                console.log('Ошибочные данные!')
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоректные данные при входе в систему"
                })
            }
            const {email,password} = req.body
            const doc = await Doctor.findOne({email:email})

            if (!doc){
                console.log('Врача нет')
                return res.status(400).json({message:"Врач не найден."})
            }
            const isMatch = password == doc.password
            // const isMatch = password == pacient.password

            if (!isMatch){
                console.log('Неверный пароль')
                alert('Неверный логин или пароль')
                return  res.status(400).json({message:"Неверный пароль."})
            }
            const token = generateAccessToken(doc._id, doc.role)
            console.log({token})
            // localStorage.setItem('userData', JSON.stringify(token));
            return res.status(200).json({token:token,id:doc._id,role:doc.role})



        }catch (e){
            return res.status(400).json({message: "Что то не так",error:e.message})
        }
    }
    async getMe(req,res){
        try{
            const doc = await Doctor.findById(req.params.id)
            console.log(doc)
            return res.json(doc)
        }
        catch (e){
            return res.status(400).json({message: "Что то не так при getMe доктора",error:e.message})

        }
    }

}
module.exports = new doctorController()
