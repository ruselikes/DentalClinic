import React, { useState } from "react";
import { Form, Button,Container} from "react-bootstrap";
import {useHistory, useNavigate} from 'react-router-dom';

const RegistrationForm = () => {

    const [email, setEmail] = useState("");
    const [name, setFirstName] = useState("");
    const [surname, setLastName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    /*------------------------------------------------*/
    const [form,setForm] = useState({
        email:'',password:'',firstName:'',lastName:'',middleName:'',roles:""
    })

    const validateEmail = (email) =>{
        return email.length >0; // не менее 5 символо
    }
    const validateName = (name) => {
        const regex = /^[a-zA-Zа-яА-Я]{2,}$/; // только буквы, не менее 2 символов
        return regex.test(name);
    };
    const validateLastName = (lastname) => {
        const regex = /^[a-zA-Zа-яА-Я]{2,}$/; // только буквы, не менее 2 символов
        return regex.test(lastname);
    };

    const validateMiddleName = (middlename) => {
        const regex = /^[a-zA-Zа-яА-Я]{2,}$/; // только буквы, не менее 2 символов
        return regex.test(middlename);
    };

    const validatePassword = (password) => {
        return password.length >= 5; // не менее 5 символов
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)){
            alert("Введите корректную почту");
            return;
        }
        if (!validateName(name)) {
            alert("Please enter a valid first name");
            return;
        }
        if (!validateLastName(surname)) {
            alert("Please enter a valid last name");
            return;
        }
        if (!validateMiddleName(middlename)) {
            alert("Please enter a valid middle name");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 5 characters long");
            return;
        }
        console.log("Form submitted");
        const jsonObj = {email:email,password:password,name:name,surname:surname,middlename:middlename}
        console.log(JSON.stringify(jsonObj))

        fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, surname, middlename})

        }).then(res => {
            res.json();
            alert("Пожалуйста, авторизируйтесь!");
            navigate("/login");
            }
        )
            .catch(error => {console.error(error);console.log("Ошибка внутри кнопки формы!)")});


    };
    /*------------------------------------------------------------------*/
    return (
        <Container style={{display:"flex",justifyContent:"center",marginTop:"4%",width:"80%"}}>
        <Form style={{width:"50%"}}onSubmit={handleSubmit}>
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

            <Form.Group controlId="firstName">
                <Form.Label>Имя:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Фамилия:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ваша фамилия"
                    value={surname}
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="middleName">
                <Form.Label>Отчество (при наличии)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ваше отчество"
                    value={middlename}
                    name="middleName"
                    onChange={(e) => setMiddleName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
        </Container>
    );
};

export default RegistrationForm;