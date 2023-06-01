import React, { useState,useContext} from 'react';
import {redirect, useNavigate} from "react-router-dom";

import {AuthContext} from '../../AuthContext'
import {Button, Form, Container} from "react-bootstrap";

const LoginForm = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext)
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    async function login (){
        if (role === "Пациент")
        {
            const result = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            }).then(res => res.json())
            console.log("Мой токен!", result)
            {
                if (result.token) {
                    await auth.login(result.token);
                    console.log("result.token", result.token)
                    await localStorage.setItem("userInfo", JSON.stringify({token: result.token, id: result.id,role:result.role}));
                    navigate('/me');
                } else {
                    alert("Неверный логин или пароль")
                }
            }
        }
        else if (role === "Доктор"){
            const result = await fetch('http://localhost:5000/doctor/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            }).then(res => res.json())
            console.log("Мой токен!", result)
            {
                if (result.token) {
                    await auth.login(result.token);
                    console.log("result.token", result.token)
                    await localStorage.setItem("userInfo", JSON.stringify({token: result.token, id: result.id,role:result.role}));
                    navigate('/me');
                } else {
                    alert("Неверный логин или пароль")
                }
            }

        }
        else if (role === "Администратор"){
            const result = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login:email, password})
            }).then(res => res.json())
            console.log("Мой токен!", result)
            {
                if (result.token) {
                    await auth.login(result.token);
                    console.log("result.token", result.token)
                    await localStorage.setItem("userInfo", JSON.stringify({token: result.token, id: result.id,role:result.role}));
                    navigate('/me');
                } else {
                    alert("Неверный логин или пароль")
                }
            }

        }
        else{alert("Перепроверьте данные, роль! ")}

    }
    const handleRoleChange = (e) => {
        setRole(e.target.value); // Update the selected role state
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    try{
        login().catch(error => console.log(error));
    }
    catch (e) {
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
            <Form.Group controlId="role">
            <Form.Label>Роль:</Form.Label>
                <Form.Control as="select" value={role} onChange={handleRoleChange}>
                    <option value="">Выберите роль</option>
                    <option value="Доктор">Доктор</option>
                    <option value="Пациент">Пациент</option>
                    <option value="Администратор">Администратор</option>
                    <option value="Регистратор">Регистратор</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" style={{"marginTop": "10px"}} >
                Войти
            </Button>

        </Form>
            </Container>


        );
};
export default LoginForm;