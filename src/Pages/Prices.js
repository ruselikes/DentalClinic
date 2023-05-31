import React, {Component, useEffect, useState} from 'react';
import Editableinput from "../Components/editableinput";
import CardUsluga from "../Components/UslugaCard/CardUsluga";
import {Button, Container} from "react-bootstrap";
import "./Styles/prices.css";
// import "./Styles/prices.js";
// const openFormBtn = document.querySelector('#open-form-btn');
// console.log(openFormBtn)
// const serviceFormContainer = document.querySelector('#service-form-container');
// console.log(serviceFormContainer)
//
// openFormBtn.addEventListener('click', () => {
//     serviceFormContainer.classList.add('open');
// });
//
// serviceFormContainer.addEventListener('click', (e) => {
//     if (e.target === serviceFormContainer) {
//         serviceFormContainer.classList.remove('open');
//     }
// });

const Prices = () => {
    const [services, setServices] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [price, setPrice] = useState('');
    const [buttonText, setButtonText] = useState('+'); // State variable for the button text
    const handleTitleChange = event => setTitle(event.target.value);

    // обработчик изменения поля текста
    const handleTextChange = event => setText(event.target.value);
    const handlePriceChange = event => setPrice(event.target.value);
    const [serviceFormContainer, setServiceFormContainer] = useState(false); // State variable to control the visibility of the form

    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:5000/prices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, text,price })
        })
            .then(res => res.json())
            .then(service => {
                setServices([...services, service]);
                setTitle('');
                setText('');
                setPrice('')
            })
            .catch(error => console.error(error));
    };

    const toggleServiceForm = () => {
        setServiceFormContainer(!serviceFormContainer);
        setButtonText(serviceFormContainer ? '+' : '-');
    };

    // загружаем существующие посты при монтировании компонента
    useEffect(() => {
        // axios.post('http://localhost:5000/api/posts')
        fetch('http://localhost:5000/prices')
            .then(res => res.json())
            .then(uslugi => setServices(uslugi))
            .catch(error => console.error(error));

    }, []);
    return (
        <>
            <Container style={{display:"flex",justifyContent:"center",marginTop:"4%",width:"80%"}}>
                <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                    {services.map((usluga) =>
                        <CardUsluga body={usluga} key={usluga._id}/>
                    )}
                    {/*</div>*/}
                </div>

            </Container>

            <button id="open-form-btn" className="open-form-btn" onClick={toggleServiceForm}>{buttonText}</button>
            {serviceFormContainer && (
            <div id="service-form-container">

                <form id="service-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Заголовок:</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} placeholder="Введите заголовок"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Текст:</label>
                        <textarea className="form-control" id="text" rows="3"  value={text} onChange={handleTextChange} placeholder="Введите текст"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Стоимость:</label>
                        <input type="text" className="form-control" value={price} onChange={handlePriceChange} id="price" placeholder="Введите стоимость"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </form>
            </div>)}
        </>
    );

};

export default Prices;