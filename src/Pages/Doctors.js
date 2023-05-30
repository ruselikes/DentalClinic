import React, {Component, useState} from 'react';
import Header from "../Components/Header/Header";
import CardDok from "../Components/DokCard/CardDok";
import Editableinput from "../Components/editableinput";
import {Button, Container} from "react-bootstrap";
import photo1 from "../Components/ilonasergeevna.jpg"

const Doctors = () => {
    const [dokcards,setDocCard] = useState([
        {id:1, name: "Илона", surname: "Маргасова", position:"Стоматолог",middlename:"Сергеевна",exp:"6 лет" },
        {id:2, name: "Алина", surname: "Почмова", position:"Стоматолог",middlename:"Викторовна",exp:"6 лет" },
        {id:3, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" },
        {id:4, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" },
        {id:5, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" },
        {id:6, name: "Наиля", surname: "Иванова", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" }
    ])
    // const AddNewDocCard = () =>{
    //     setDocCard([...doc])
    //
    // }
    return (
        <>
        <Container style={{display:"flex",justifyContent:"center",marginTop:"4%"}}>
            <div style={{width:"80%", display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                {dokcards.map((dcard) =>
                    <CardDok  dok={dcard} key={dcard.id}/>
                )}
            </div>

        </Container>
        {/*<Editableinput/>*/}
        {/*<Button variant={'primary'}>Зарегистрироваться</Button>*/}
        </>
    );
};

export default Doctors;
