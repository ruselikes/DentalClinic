import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div>
            <Image src="https://example.com/banner.jpg" fluid />
            <Container>
                <Row>
                    <Col>
                        <h2>Реквизиты клиники</h2>
                        <p>Название клиники</p>
                        <p>Адрес: город, улица, дом</p>
                        <p>Телефон: +7 (123) 456-78-90</p>
                        <p>Email: info@example.com</p>
                    </Col>
                    <Col>
                        <h2>Информация об оборудовании</h2>
                        <ul>
                            <li>Оборудование 1</li>
                            <li>Оборудование 2</li>
                            <li>Оборудование 3</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;