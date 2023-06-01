const Admin = require('../models/admin')
const Doctor = require('../models/doctor')
const Manager = require('../models/manager')
const Role = require('../models/role')

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const config = require("config");
const Pacient = require("../models/pacient");
const secret = config.get("secret")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class adminController{

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
            const {login,password} = req.body
            const admin = await Admin.findOne({login:login})

            if (!admin){
                console.log('Врача нет')
                return res.status(400).json({message:"admin не найден."})
            }
            const isMatch = password == admin.password
            // const isMatch = password == pacient.password

            if (!isMatch){
                console.log('Неверный пароль')
                alert('Неверный логин или пароль')
                return  res.status(400).json({message:"Неверный пароль."})
            }
            const token = generateAccessToken(admin._id, admin.role)
            console.log({token})
            // localStorage.setItem('userData', JSON.stringify(token));
            return res.status(200).json({token:token,id:admin._id,role:admin.role})



        }catch (e){
            return res.status(400).json({message: "Что то не так admin login",error:e.message})
        }
    }
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
    async addStuff(req,res){

        try {
            const { email, password, name, surname, middlename } = req.body;

            // Создание нового объекта доктора
            const newStaff = new Manager({
                email,
                password,
                name,
                surname,
                middlename,
            });

            // Сохранение нового доктора в базе данных
            const savedStuff = await newStaff.save();

            res.status(201).json(savedStuff);
        } catch (error) {
            res.status(500).json({ error: error.message, message:"Ошибка при добавлении товарища Stuff" });
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
    async deleteStuff(req,res){

        try {
            const { id } = req.params;
            // Удаление доктора по ID
            await Manager.findByIdAndRemove(id);

            res.status(200).json({ message: 'Staff успешно удален' });
        } catch (error) {
            res.status(500).json({ error: error.message });
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
    async getStaff(req,res){
        try{
            const users = await Manager.find()
            return res.json(users)
        }
        catch (e) {
            return res.status(400).json({message: "Что то не так ополучени всех менеджеров",error:e.message})
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
    async editStuff(req,res) {


        try {
            const {id} = req.params;
            const {email, password, name, surname, middlename} = req.body;

            // Найти доктора по ID
            const staff = await Manager.findById(id);

            // Обновление данных доктора
            staff.email = email;
            staff.password = password;
            staff.name = name;
            staff.surname = surname;
            staff.middlename = middlename;

            // Сохранение обновленных данных в базе данных
            const updatedStaff = await staff.save();

            res.status(200).json(updatedStaff);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async addAdmin(req,res){

        try{
            const {login, password } = req.body

            const candidate = await Admin.findOne({login: login})

            if (candidate) {
                return res.status(400).json({message:"Пользователь с таким login уже зарегистрирован в системе."})
            }

            const new_admin = new Admin ({login:login,password: password})
            await new_admin.save()
            res.status(201).json({message:"new_admin добавлен систему",user:new_admin})
        }

        catch(e){
            res.status(500).json({message:"На моем серверe (при регистрации) что то не так. tg: trimberg",error: e.message})
        }
    }

}
module.exports = new adminController()
