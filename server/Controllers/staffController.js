const User = require('../models/pacient')
const Manager = require('../models/manager')

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

class stuffController{

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
            const man = await Manager.findOne({email:email})

            if (!man){
                console.log('Man нет')
                return res.status(400).json({message:"Man не найден."})
            }
            const isMatch = password == man.password
            // const isMatch = password == pacient.password

            if (!isMatch){
                console.log('Неверный пароль')
                alert('Неверный логин или пароль')
                return  res.status(400).json({message:"Неверный пароль."})
            }
            const token = generateAccessToken(man._id, man.role)
            console.log({token})
            // localStorage.setItem('userData', JSON.stringify(token));
            return res.status(200).json({token:token,id:man._id,role:man.role})



        }catch (e){
            return res.status(400).json({message: "Что то не так",error:e.message})
        }
    }
    async getMe(req,res){
        try{
            const man = await Manager.findById(req.params.id)
            console.log(man)
            return res.json(man)
        }
        catch (e){
            return res.status(400).json({message: "Что то не так при getMe man",error:e.message})

        }
    }

}
module.exports = new stuffController()
