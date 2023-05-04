import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import photo1 from "../ilonasergeevna.jpg"
import "./CardUsluga.css";


//  сама карточка услуги, принимает параметры и рисует карточку
const CardUsluga = (props) => {

    return (

        <Card className={"CardUsluga"}>
            {/*<Card.Img variant="top" src={photo1} />*/}
            <Card.Body style={{height:"60px"}}>
                <Card.Title style={{textAlign:"center"}}>{props.body.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item href={"/home"}><b>Стоимость:</b> {props.body.price} руб.</ListGroup.Item>
                <ListGroup.Item style={{minHeight:"120px"}}><b>Описание:</b> {props.body.text}</ListGroup.Item>
                <a href="/reg" className="stretched-link"></a>
            </ListGroup>

        </Card>


    );
};

export default CardUsluga;