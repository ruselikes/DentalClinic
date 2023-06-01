const User = require('../models/pacient')
const Role = require('../models/role')
const Pacient = require("../models/pacient");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const config = require("config");
const Doctor = require("../models/doctor");
const secret = config.get("secret")
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"} )
}

class authController{
    async edit(req,res) {
        try {
            const {id} = req.params;
            const {email, password, name, surname, middlename} = req.body;

            // Найти доктора по ID
            const pacient = await Pacient.findById(id);
            const hashedPassword =await bcrypt.hash(password,2)

            // Обновление данных доктора
            pacient.email = email;
            pacient.password = hashedPassword;
            pacient.name = name;
            pacient.surname = surname;
            pacient.middlename = middlename;

            // Сохранение обновленных данных в базе данных
            const updatedPacient = await pacient.save();

            res.status(200).json(updatedPacient);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async delete(req,res){
            try {
                const { id } = req.params;
                await Pacient.findByIdAndRemove(id);
                res.status(200).json({ message: "Пациент успешно удален" });
            } catch (error) {
                res.status(500).json({error: error.message});
            }
    }

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
                res.status(201).json({message:"Пациент добавлен систему",user:new_pacient})
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
            const pacient = await Pacient.findOne({email:email})

            if (!pacient){
                console.log('Пользователя нет')
                return res.status(400).json({message:"Пользователь не найден."})
            }
            // const isMatch = await bcrypt.compare(password,pacient.password)
            const isMatch = password === pacient.password

            if (!isMatch){
                console.log('Неверный пароль')
                alert('Неверный логин или пароль')
                return  res.status(400).json({message:"Неверный пароль."})
            }
            const token = generateAccessToken(pacient._id, pacient.role)
            console.log({token})
            // localStorage.setItem('userData', JSON.stringify(token));
            return res.status(200).json({token:token,id:pacient._id,role:pacient.role})



        }catch (e){
            return res.status(400).json({message: "Что то не так",error:e.message})
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
            return res.status(400).json({message: "Что то не так при getMe",error:e.message})

        }
    }

}
module.exports = new authController()
