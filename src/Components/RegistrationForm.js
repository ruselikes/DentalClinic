import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [password, setPassword] = useState("");
    // const history = useHistory();

    // const handleRegistrationClick = () => {
    //     history.push('/registration');
    // };
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
        console.log(email, firstName, lastName, middleName, password);

    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="middleName">
                <Form.Label>Middle Name (optional)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter middle name"
                    value={middleName}
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