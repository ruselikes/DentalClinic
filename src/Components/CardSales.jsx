import React from 'react';
import gigiena from "./gigiena.png"
const CardSales = () => {
    return (


        <div  style={{display: "flex", justifyContent:"center",width:'80%',borderRadius:"20px",padding:"20px 20px",boxShadow: "0px 5px 20px 0px #00000040"}}>

            <div style={{width:'50%'}}>
                <img src={gigiena} style={{borderRadius:"20px"}}
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