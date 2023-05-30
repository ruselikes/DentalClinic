const Doctor = require('../models/doctor')
const Role = require('../models/role')

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

class adminController{
    async addDoc(req,res){

        try {
            const { email, password, name, surname, middlename } = req.body;

            // Создание нового объекта доктора
            const newDoctor = new Doctor({
                email,
                password,
                name,
                surname,
                middlename,
            });

            // Сохранение нового доктора в базе данных
            const savedDoctor = await newDoctor.save();

            res.status(201).json(savedDoctor);
        } catch (error) {
            res.status(500).json({ error: error.message, message:"Ошибка при добавлении товарища доктора" });
        }
    };

    async deleteDoc(req,res){

        try {
            const { id } = req.params;
            // Удаление доктора по ID
            await Doctor.findByIdAndRemove(id);

            res.status(200).json({ message: 'Доктор успешно удален' });
        } catch (error) {
            res.status(500).json({ error: error.message });
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
            const pacient = await Doctor.findOne({email:email})

            if (!pacient){
                console.log('Пользователя нет')
                return res.status(400).json({message:"Пользователь не найден."})
            }
            const isMatch = await bcrypt.compare(password,pacient.password)
            // const isMatch = password == pacient.password

            if (!isMatch){
                console.log('Неверный пароль')
                alert('Неверный логин или пароль')
                return  res.status(400).json({message:"Неверный пароль."})
            }
            const token = generateAccessToken(pacient._id, pacient.roles)
            console.log({token})
            // localStorage.setItem('userData', JSON.stringify(token));
            return res.status(200).json({token:token})



        }catch (e){
            return res.status(400).json({message: "Что то не так",error:e.message})
        }
    }
    async getDocs(req,res){
        try{
            const users = await Doctor.find()
            return res.json(users)
        }
        catch (e) {
            return res.status(400).json({message: "Что то не так",error:e.message})
        }
    }
    async editDoc(req,res) {


        try {
            const {id} = req.params;
            const {email, password, name, surname, middlename} = req.body;

            // Найти доктора по ID
            const doctor = await Doctor.findById(id);

            // Обновление данных доктора
            doctor.email = email;
            doctor.password = password;
            doctor.name = name;
            doctor.surname = surname;
            doctor.middlename = middlename;

            // Сохранение обновленных данных в базе данных
            const updatedDoctor = await doctor.save();

            res.status(200).json(updatedDoctor);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}
module.exports = new adminController()
