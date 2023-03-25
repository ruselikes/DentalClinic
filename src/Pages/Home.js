import React, {Component} from 'react';
import StartWindow from "../Components/StartWindow";
import {Container} from "react-bootstrap";
import CardSales from "../Components/CardSales";


const Home = () => {
    return (
        <div>

            <Container className='mt-5' style={{display:"flex",justifyContent:"center"}}>
                <StartWindow/>

            </Container>
            <h2  style = {{textAlign:"center",margin:"10vh 0"}}>Акции</h2>
            <Container  style={{display:"flex",justifyContent:"center"}}>
                <CardSales/>
            </Container>

        </div>
    );
};



export default Home;