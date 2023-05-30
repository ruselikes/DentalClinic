import {React, useContext, useState} from 'react';
import {Container, Navbar,Nav, Button} from "react-bootstrap";
import logo from "../free-icon-tooth-993344.png"
import {BrowserRouter,  Route, Link, Routes,useNavigate} from "react-router-dom"
import Home from "../../Pages/Home"
import Doctors from "../../Pages/Doctors"
import Prices from "../../Pages/Prices"
import './Header.css';
import AuthPage from "../../Pages/AuthPage";
import {AuthContext} from '../../AuthContext'
const Header = (isAutorization) => {

    const auth = useContext(AuthContext)

    const navigate = useNavigate()
    const logoutHandler = event => {
        event.preventDefault();
        let myData = localStorage.getItem('userInfo');
        console.log("до auth.logout",myData);
        console.log("до auth.logout at",auth.token);
        auth.logout();
        navigate('/')
        localStorage.removeItem("userInfo")
        myData = localStorage.getItem('userInfo');
        console.log("после auth.logout",myData);
        console.log("после auth.logout at",auth.token);

    }
    if (!isAutorization.isA) {
        return (
            <>
                <Navbar /*style={{position:"sticky"}}*/ /*fixed={'top'}
                        /*className={'position-sticky ps-0'} fixed="top"*/ collapseOnSelect bg="light" variant="light"
                                                                           expand="md">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"

                            /> NeoDental
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse className={'justify-content-between'} id="responsive-navbar-nav">
                            <Nav className="ml-auto ">
                                <Nav.Link href="/">Главная</Nav.Link>
                                <Nav.Link href="/doctors">Врачи</Nav.Link>
                                <Nav.Link href="/prices">Услуги</Nav.Link>

                            </Nav>

                            <Nav>

                                <Button href="/login" className="but-margin" variant={'primary'}>Войти</Button>

                                {/*<button  onClick={handleRegistrationClick}>Зарегистрироваться</button>*/}
                                <Button href="/reg" className="but-margin"  variant={'primary'}>Регистрация</Button>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                    {/*<Container>*/}
                    {/*    <Navbar.Brand href="#">Название клиники</Navbar.Brand>*/}
                    {/*    <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                    {/*    <Navbar.Collapse id="basic-navbar-nav">*/}
                    {/*        <Nav className="me-auto">*/}
                    {/*            <Nav.Link href="#">Главная</Nav.Link>*/}
                    {/*            <Nav.Link href="#">Услуги</Nav.Link>*/}
                    {/*            <Nav.Link href="#">Контакты</Nav.Link>*/}
                    {/*        </Nav>*/}
                    {/*        <Nav>*/}
                    {/*            <Nav.Item>*/}
                    {/*                <Nav.Link>*/}
                    {/*                    Адрес: город, улица, дом*/}
                    {/*                </Nav.Link>*/}
                    {/*            </Nav.Item>*/}
                    {/*            <Nav.Item>*/}
                    {/*                <Nav.Link>*/}
                    {/*                    Телефон: +7 (123) 456-78-90*/}
                    {/*                </Nav.Link>*/}
                    {/*            </Nav.Item>*/}
                    {/*            <Nav.Item>*/}
                    {/*                <Nav.Link>*/}
                    {/*                    Email: info@example.com*/}
                    {/*                </Nav.Link>*/}
                    {/*            </Nav.Item>*/}
                    {/*        </Nav>*/}
                    {/*    </Navbar.Collapse>*/}
                    {/*</Container>*/}
                </Navbar>
                {/*<Router>*/}
                {/*    <Routes>*/}
                {/*        <Route exact path="/" element={< Home />} />*/}
                {/*        <Route exact path="/doctors" element={<Doctors />} />*/}
                {/*        <Route exact path="/prices" element={<Prices />} />*/}
                {/*        <Route exact path="/reg" element={<AuthPage />} />*/}
                {/*    </Routes>*/}
                {/*</Router>*/}

            </>
        );
    }
    else{
        return(
        <>
        <Navbar /*style={{position:"sticky"}}*/ /*fixed={'top'}
                        /*className={'position-sticky ps-0'} fixed="top"*/ collapseOnSelect bg="light" variant="light"
                                                                           expand="md">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="30"
                        width="30"
                        className="d-inline-block align-top"
                        alt="Logo"

                    /> NeoDental
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className={'justify-content-between'} id="responsive-navbar-nav">
                    <Nav className="ml-auto ">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/doctors">Врачи</Nav.Link>
                        <Nav.Link href="/prices">Услуги</Nav.Link>

                    </Nav>

                    <Nav>
                        <Button href="/me" className="but-margin" variant={'primary'}>ЛК</Button>
                        {/*<button  onClick={handleRegistrationClick}>Зарегистрироваться</button>*/}

                        <Button href="/reg" className="but-margin" onClick={logoutHandler} variant={'primary'}>Выйти</Button>

                    </Nav>

                </Navbar.Collapse>
            </Container>
            {/*<Container>*/}
            {/*    <Navbar.Brand href="#">Название клиники</Navbar.Brand>*/}
            {/*    <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
            {/*    <Navbar.Collapse id="basic-navbar-nav">*/}
            {/*        <Nav className="me-auto">*/}
            {/*            <Nav.Link href="#">Главная</Nav.Link>*/}
            {/*            <Nav.Link href="#">Услуги</Nav.Link>*/}
            {/*            <Nav.Link href="#">Контакты</Nav.Link>*/}
            {/*        </Nav>*/}
            {/*        <Nav>*/}
            {/*            <Nav.Item>*/}
            {/*                <Nav.Link>*/}
            {/*                    Адрес: город, улица, дом*/}
            {/*                </Nav.Link>*/}
            {/*            </Nav.Item>*/}
            {/*            <Nav.Item>*/}
            {/*                <Nav.Link>*/}
            {/*                    Телефон: +7 (123) 456-78-90*/}
            {/*                </Nav.Link>*/}
            {/*            </Nav.Item>*/}
            {/*            <Nav.Item>*/}
            {/*                <Nav.Link>*/}
            {/*                    Email: info@example.com*/}
            {/*                </Nav.Link>*/}
            {/*            </Nav.Item>*/}
            {/*        </Nav>*/}
            {/*    </Navbar.Collapse>*/}
            {/*</Container>*/}
        </Navbar>
        {/*<Router>*/}
        {/*    <Routes>*/}
        {/*        <Route exact path="/" element={< Home />} />*/}
        {/*        <Route exact path="/doctors" element={<Doctors />} />*/}
        {/*        <Route exact path="/prices" element={<Prices />} />*/}
        {/*        <Route exact path="/reg" element={<AuthPage />} />*/}
        {/*    </Routes>*/}
        {/*</Router>*/}

        </>
        );

    }
    }


export default Header;