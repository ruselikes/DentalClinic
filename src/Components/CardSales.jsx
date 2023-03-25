import React from 'react';
import gigiena from "./gigiena.png"
const CardSales = () => {
    return (


        <div style={{display: "flex", justifyContent:"center",width:'80%'}}>

            <div style={{width:'50%'}}>
                <img src={gigiena}
                     height="100%"
                     width="100%"
                     className="d-inline-block align-top"
                     alt="Logo"/>
            </div>
            <div>
                <h3>Профессиональная гигиена полости рта</h3>
                <p>
                    <del>6500₽</del> ->3500₽
                </p>
            </div>
        </div>

    );
};

export default CardSales;