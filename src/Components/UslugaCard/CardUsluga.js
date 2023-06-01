import React from 'react';
import {Card,Button} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import photo1 from "../ilonasergeevna.jpg"
import { Link } from 'react-router-dom';

import "./CardUsluga.css";


//  сама карточка услуги, принимает параметры и рисует карточку
const CardUsluga = (props) => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const handleDelete = (event) => {
        event.stopPropagation();
        // fetch('/api/delete-usluga', {
        //     method: 'DELETE',
        //     // Дополнительные параметры запроса, если нужно
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             console.log('Услуга успешно удалена');
        //         } else {
        //             console.log('Ошибка удаления услуги');
        //         }
        //     })
        //     .catch(error => {
        //         console.log('Ошибка удаления услуги:', error);
        //     });

        console.log("Типа удлаение!")
    };
    if (userInfo.role == "админ"){
        return (
            <Card className="CardUsluga">
                <Card.Body>
                    <Card.Title style={{textAlign: "center"}}><Link
                        to={`/prices/${props.body._id}`}>{props.body.title}</Link></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <b>Стоимость:</b> {props.body.price} руб.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <b>Описание:</b> {props.body.text}
                    </ListGroup.Item>
                    <Button variant="danger" className="delete-button" onClick={handleDelete}>
                        Удалить услугу
                    </Button>
                </ListGroup>
            </Card>
        );
    }

        return (
            <Card className="CardUsluga">
                <Card.Body>
                    <Card.Title style={{textAlign: "center"}}><Link
                        to={`/prices/${props.body._id}`}>{props.body.title}</Link></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <b>Стоимость:</b> {props.body.price} руб.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <b>Описание:</b> {props.body.text}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        );

};

export default CardUsluga;