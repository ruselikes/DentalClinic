import React, {Component, useEffect, useState} from 'react';
import Header from "../Components/Header/Header";
import CardDok from "../Components/DokCard/CardDok";
import Editableinput from "../Components/editableinput";
import {Button, Container} from "react-bootstrap";
import photo1 from "../Components/ilonasergeevna.jpg"

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    // const [dokcards,setDocCard] = useState([
    //     {id:1, name: "Илона", surname: "Маргасова", position:"Стоматолог",middlename:"Сергеевна",exp:"6 лет" },
    //     {id:2, name: "Алина", surname: "Почмова", position:"Стоматолог",middlename:"Викторовна",exp:"6 лет" },
    //     {id:3, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" },
    //     {id:4, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" },
    //     {id:5, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" },
    //     {id:6, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" }
    // ])


    useEffect(() => {
        // Получение списка докторов при загрузке компонента
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/doctor/getAll');
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
        <Container style={{display:"flex",justifyContent:"center",marginTop:"4%"}}>
            <div style={{ width: "80%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                {doctors.length == 0 && <h1>нет докторов</h1>}
                {doctors.length !== 0 && doctors.map((dcard) => <CardDok dok={dcard} key={dcard._id} />)}
            </div>

        </Container>
        {/*<Editableinput/>*/}
        {/*<Button variant={'primary'}>Зарегистрироваться</Button>*/}
        </>
    );
};

export default Doctors;
