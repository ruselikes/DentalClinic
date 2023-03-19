import React, {Component, useState} from 'react';
import Header from "../Components/Header";
import CardDok from "../Components/CardDok";


const Doctors = () => {
    const [dokcards,setDocCard] = useState([
        {id:1, name: "Илона", surname: "Маргасова", position:"Стоматолог",middlename:"Сергеевна",exp:"6 лет" },
        {id:2, name: "Алина", surname: "Почмова", position:"Стоматолог",middlename:"Сергеевна",exp:"6 лет" },
        {id:3, name: "НаиЗля", surname: "ЯмалВалиева", position:"Стоматлог-Хирург",middlename:"Дмитриевна",exp:"4 лет" }
    ])
    return (
        <div>
            <div style={{width:"80%", display:"flex",justifyContent:"space-between"}}>
                {dokcards.map((dcard) =>
                    <CardDok dok={dcard} key={dcard.id}/>
                )}
            </div>
        </div>
    );
};

export default Doctors;
