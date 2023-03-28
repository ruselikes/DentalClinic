import {BrowserRouter as Router,  Route, Link, Routes} from "react-router-dom"
import './App.css';
import { SecondElement } from './Components/SecondElement';
import CardDok  from './Components/CardDok';
import HomePage  from './Components/HomePage';
import Header from  './Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import Doctors from "./Pages/Doctors";
import MyNavBar from "./Components/extra";
import Extra from "./Components/extra";
import Footer from "./Components/Footer";
import useRoutes from "./Routes/routes";
function App() {
    const route = useRoutes(false)
  return (


        <>
        <Header/>
        <div className="container">
            {route}
          {/*<MyNavBar/>*/}
          {/*style={{marginTop:"60px"}*!/*/}
          {/*<MyNavBar style={{display:"flex"}}/>*/}
          {/*----------------------------<Footer/>*/}

        </div>
        </>
    )
     {/*</>    ;*/}


    {/*<HomePage/>*/}
    {/*<h1>Hello,  sssWorldsddsadd!</h1>*/}
    {/*<Button variant="outline-success">GDgd</Button>*/}
    {/*<SecondElement />*/}


}

export default App;
