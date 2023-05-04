import {BrowserRouter as Router, Route, Link, Routes, Navigate} from "react-router-dom"
import './App.css';
import { SecondElement } from './Components/SecondElement';
import CardDok  from './Components/DokCard/CardDok';
import HomePage  from './Components/HomePage';
import Header from './Components/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, {useState} from "react";
import Doctors from "./Pages/Doctors";
import MyNavBar from "./Components/extra";
import Extra from "./Components/extra";
import Footer from "./Components/Footer";
import useRoutes from "./Routes/routes";
import {Container} from "react-bootstrap";
import Home from "./Pages/Home";
import Prices from "./Pages/Prices";
import AuthPage from "./Pages/AuthPage";
import LoginForm from "./Components/Autorization/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
function App() {
    const route = useRoutes(true)
    const isA = true;
      return (


            <>
                {/*<Container style={{width:"80%"}}>{route}</Container>*/}
            <Header isA={isA}/>
                <Router >
                    <Routes>
                        <Route  exact path="/" element={< Home/>}/>
                        <Route exact path="/doctors" element={<Doctors/>}/>
                        <Route exact path="/prices" element={<Prices/>}/>
                        <Route exact path="/reg" element={<RegistrationForm />} />
                        <Route exact path="/login" element={<LoginForm />} />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                </Router>
              {/*<MyNavBar/>*/}
              {/*style={{marginTop:"60px"}*!/*/}
              {/*<MyNavBar style={{display:"flex"}}/>*/}
              {/*----------------------------<Footer/>*/}


            </>
      )
     {/*</>    ;*/}
    {/*<HomePage/>*/}
    {/*<h1>Hello,  sssWorldsddsadd!</h1>*/}
    {/*<Button variant="outline-success">GDgd</Button>*/}
    {/*<SecondElement />*/}


}

export default App;
