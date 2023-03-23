import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import photo1 from "./ilonasergeevna.jpg"
import "../Styles/carddok.css"

const CardDok = (props) => {
    return (
        <Card style={{ width: '18rem'}}>
            <Card.Img variant="top" src={photo1} />
            <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{props.dok.surname} {props.dok.name} {props.dok.middlename} </Card.Title>
                {/*<Card.Text>*/}
                {/*    Some quick example text to build on the card title and make up the*/}
                {/*    bulk of the card's content.*/}
                {/*</Card.Text>*/}
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item><b>Должность:</b> {props.dok.position}</ListGroup.Item>
                <ListGroup.Item><b>Трудовой стаж:</b> {props.dok.position}</ListGroup.Item>
            </ListGroup>

        </Card>
    );
};

export default CardDok;