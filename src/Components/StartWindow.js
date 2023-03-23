import React from 'react';
import "./StartWindow.css";
import photo1 from "./image1.png"

const StartWindow = () => {
    return (
        <section className={"main"}>
            <div className={"text"}>
                <h1>ЛЕЧЕНИЕ ЗУБОВ ПОД МИКРОСКОПОМ</h1>
                <p>
                    Заботимся о вашем абсолютном комфорте во время имплантации зубов! <br/>Врач-анестезиолог с опытом работы более 30 лет погружает вас в состояние, близкое к физиологическому сну. Вы просыпаетесь, когда операция уже закончена.
                </p>
            </div>
            <div className={"photo"}>
                <img src={photo1}/>
            </div>
        </section>
    );
};

export default StartWindow;