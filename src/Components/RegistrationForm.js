import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [password, setPassword] = useState("");
    /*------------------------------------------------*/
    const [form,setForm] = useState({
        email:'',password:'',firstName:'',lastName:'',middleName:''
    })
    const changeHandler = event =>{
        setForm(...form,event.target.name,event.target.value)
    }
    /*------------------------------------------------------------------*/
    // const history = useHistory();

    // const handleRegistrationClick = () => {
    //     history.push('/registration');
    // };
    const validateEmail = (email) =>{
        return email.length >0; // не менее 5 символо
    }
    const validateName = (name) => {
        const regex = /^[a-zA-Zа-яА-Я]{2,}$/; // только буквы, не менее 2 символов
        return regex.test(name);
    };
    const validateLastName = (lastName) => {
        const regex = /^[a-zA-Zа-яА-Я]{2,}$/; // только буквы, не менее 2 символов
        return regex.test(lastName);
    };

    const validateMiddleName = (middleName) => {
        const regex = /^[a-zA-Zа-яА-Я]{2,}$/; // только буквы, не менее 2 символов
        return regex.test(middleName);
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
        if (!validateName(firstName)) {
            alert("Please enter a valid first name");
            return;
        }
        if (!validateLastName(lastName)) {
            alert("Please enter a valid last name");
            return;
        }
        if (!validateMiddleName(middleName)) {
            alert("Please enter a valid middle name");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 5 characters long");
            return;
        }
        console.log("Form submitted");
        const jsonObj = {email:email,firstName:firstName,lastName:lastName,middleName:middleName,password:password}
        console.log(JSON.stringify(jsonObj))
        alert("Успешная регистрация!")

    };
    /*------------------------------------------------------------------*/
    return (
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

            <Form.Group controlId="firstName">
                <Form.Label>Имя:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ваше имя"
                    value={firstName}
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Фамилия:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ваша фамилия"
                    value={lastName}
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="middleName">
                <Form.Label>Отчество (при наличии)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ваше отчество"
                    value={middleName}
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
    );
};

export default RegistrationForm;