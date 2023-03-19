
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
const docs =[
    {}
]
function App() {

  return (
    // <div class= "container-fluid align-items-center">
      <div >
          {/*<MyNavBar/>*/}
          <Header />{/*style={{marginTop:"60px"}*/}
          {/*<MyNavBar style={{display:"flex"}}/>*/}


    {/*<HomePage/>*/}
    {/*<h1>Hello,  sssWorldsddsadd!</h1>*/}
    {/*<Button variant="outline-success">GDgd</Button>*/}
    {/*<SecondElement />*/}
    </div>
    );
}

export default App;
