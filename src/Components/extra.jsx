import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const MyNavBar = () => {
    return (
        // <Navbar bg="light" expand="lg">
        //     <Container>
        //         <Navbar.Brand href="#">Название клиники</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link href="#">Главная</Nav.Link>
        //                 <Nav.Link href="#">Услуги</Nav.Link>
        //                 <Nav.Link href="#">Контакты</Nav.Link>
        //             </Nav>
        //             <Nav>
        //                 <Nav.Item>
        //                     <Nav.Link>
        //                         Адрес: город, улица, дом
        //                     </Nav.Link>
        //                 </Nav.Item>
        //                 <Nav.Item>
        //                     <Nav.Link>
        //                         Телефон: +7 (123) 456-78-90
        //                     </Nav.Link>
        //                 </Nav.Item>
        //                 <Nav.Item>
        //                     <Nav.Link>
        //                         Email: info@example.com
        //                     </Nav.Link>
        //                 </Nav.Item>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <Navbar style={{display:"flex"}} bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://example.com/logo.png"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Логотип клиники"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/services">Услуги</Nav.Link>
                        <Nav.Link href="/contact">Контакты</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <div className="bg-white py-3">
                <Container>
                    <p>Адрес: город, улица, дом</p>
                    <p>Телефон: +7 (123) 456-78-90</p>
                    <p>Email: info@example.com</p>
                </Container>
            </div>
        </Navbar>
    );
};


export default MyNavBar;