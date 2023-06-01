import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import "./Me.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WaitAppCard from "../AppointmentCards/WaitAppCard";
import PacProfile from "../Profiles/Pacient";
import AdminPage from "../../Pages/AdminPage";
import ManProfile from "../Profiles/Manager";

const AboutMe = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [password, setPassword] = useState('');
    const [userData,setUserData] = useState({user: {surname: null,name: null, email: null,middlename: null}})
    const [token, setToken] = useState(auth.token)

    const [appointments,setAppoiintments] = useState([])

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getZapisi = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/priem/getMy/${userInfo.id}`);
            const data = await response.json();
            setAppoiintments(data)
            console.log("zapisi",data);
        } catch (error) {
            console.error("Ошибка при получении списка докторов", error);
        }
    }

    console.log("usInfo",userInfo)
    async function getAboutMe (){
        const pacient = await fetch('http://localhost:5000/auth/me',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', // суть ошибки здесь, token не такой, или не так передается
                    'Authorization':`Bearer ${userInfo.token}`}
            }).then(user => user.json())

            if (pacient)
            {
                setUserData(pacient);
                console.log("Юзер дата",userData, userData.user.surname)
            }
            else{
                alert("Произошла ошибка при получении юзера");
            }
            }
    console.log("token (перед ним стоит token = auth.token: ",auth.token)
    useEffect(() => {
        getAboutMe()
        getZapisi()


    }, []);

    if (userInfo === null) {
        return (<h1>Авторизируйтесь</h1>); // Возвращаем null, если userInfo равно null
    }

    if (userInfo.role == "пациент") {
        return (
            <PacProfile/>

        );
    }
    else if (userInfo.role == "доктор"){return (<h1>Доктор чтоли?</h1>)}
    else if (userInfo.role == "админ"){return (<AdminPage/>)}
    else if (userInfo.role == "менеджер") {return (<ManProfile/>)}
};




export default AboutMe;