import React, { useState,useContext} from 'react';
import {redirect, useNavigate} from "react-router-dom";

import {AuthContext} from '../../AuthContext'
import {Button, Form, Container} from "react-bootstrap";

const LoginForm = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    try{
        // Отправка запроса на серверную часть
        // const userdata = await fetch('http://localhost:5000/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });
        // auth.login(userdata.token)

        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json()
            ).then(
                userData =>
                {if (userData.token)
                {
                    auth.login(userData.token);
                    auth.token = userData.token;
                    console.log("Из формы входа токен:",userData.token);
                    console.log("Из формы входа токен из authcontext:",auth.token)
                    navigate('/');
                }
                else {
                    alert("Неверный логин или пароль")
                }
                })



            .catch(error => console.log(error));
    }catch (e){
        console.log(e)
    }

    };

    return (
        <Container style={{display:"flex",justifyContent:"center",marginTop:"4%"}}>

        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>E-mail адрес:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Введите E-mail"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Пароль:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Войти
            </Button>
        </Form>
            </Container>


        );
};
export default LoginForm;