import React, {Component} from 'react';
import StartWindow from "../Components/StartWindow";
import {Container} from "react-bootstrap";


const Home = () => {
    return (
        <div>

                <Container className='mt-5' style={{display:"flex",justifyContent:"center"}}>
                    <StartWindow/>
                </Container>
        </div>
    );
};



export default Home;