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
import {useAuth} from './hooks/authhook'
import {AuthContext} from './AuthContext'
import LoginForm from "./Components/Autorization/LoginForm";
import AboutMe from "./Components/Autorization/Me";

import RegistrationForm from "./Components/Autorization/RegistrationForm";
import AdminPage from "./Pages/AdminPage";
import UslugaPage from "./Components/UslugaPage/UslugaPage";
function App() {
    let role  = "admin"
    const route = useRoutes(true)
    const isA = true;
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
      return (
          <AuthContext.Provider value={{
              token, login, logout, userId, isAuthenticated}}>





                    <Router >
                        <Header isA={isAuthenticated }/>
                        <h1> {isAuthenticated ?"auth" :"not auth"}</h1>
                        <Routes>
                            <Route  exact path="/" element={< Home/>}/>
                            <Route exact path="/doctors" element={<Doctors/>}/>
                            <Route exact path="/prices" element={<Prices/>}/>
                            <Route exact path="/reg" element={<RegistrationForm />} />
                            <Route exact path="/login" element={<LoginForm />} />
                            {/*<Route exact path="/login" element={<LoginForm />} />*/}
                            <Route exact path="/me" element={<AboutMe tok={token} />} />
                            <Route exact path="/admin" element={<AdminPage />}/>
                            <Route exact path="/prices/:id" element={<UslugaPage />}/>
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </Router>


              {/*{isAuthenticated && role === "admin" && (*/}
              {/*<Router >*/}
              {/*    /!*<Header isA={isAuthenticated }/>*!/*/}
              {/*    <h1> Админ я</h1>*/}
              {/*    <Routes>*/}
              {/*        <Route  exact path="/" element={< Home/>}/>*/}
              {/*        <Route exact path="/reg" element={<RegistrationForm />} />*/}
              {/*        <Route exact path="/login" element={<LoginForm />} />*/}
              {/*        /!*<Route exact path="/login" element={<LoginForm />} />*!/*/}
              {/*        <Route exact path="/me" element={<AboutMe tok={token} />} />*/}
              {/*        <Route exact path="/admin" element={<AdminPage />}/>*/}
              {/*        <Route*/}
              {/*            path="*"*/}
              {/*            element={<Navigate to="/" replace />}*/}
              {/*        />*/}
              {/*    </Routes>*/}
              {/*</Router>)}*/}




          </AuthContext.Provider>
      )


}

export default App;
