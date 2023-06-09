import React, {Component} from 'react';
import {Container, Navbar,Nav, Button} from "react-bootstrap";
import logo from "./free-icon-tooth-993344.png"
import {BrowserRouter as Router,  Route, Link, Routes} from "react-router-dom"
import Home from "../Pages/Home"
import Doctors from "../Pages/Doctors"
import Prices from "../Pages/Prices"
import './Header.css';
class Header extends Component {
    render() {
        return (
            <>
                <Navbar /*style={{position:"sticky"}}*/ /*fixed={'top'}
                        /*className={'position-sticky ps-0'} fixed="top"*/ collapseOnSelect bg = "light" variant="light" expand="md">
                    <Container>
                        <Navbar.Brand  href="/">
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"

                            /> NeoDental
                        </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse className={'justify-content-between'}  id="responsive-navbar-nav">
                                <Nav className="ml-auto " >
                                    <Nav.Link href="/">Главная</Nav.Link>
                                    <Nav.Link href="/doctors">Врачи</Nav.Link>
                                    <Nav.Link href="/prices">Услуги</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Button className="but-margin" variant={'primary'}>Войти</Button>
                                    <Button variant={'primary'}>Зарегистрироваться</Button>
                                </Nav>
                            </Navbar.Collapse>
                    </Container>
                    <b></b>
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
                <Router>
                    <Routes>
                        <Route exact path="/" element={< Home />} />
                        <Route exact path="/doctors" element={<Doctors />} />
                        <Route exact path="/prices" element={<Prices />} />
                    </Routes>
                </Router>
                
            </>
        );
    }
}

export default Header;