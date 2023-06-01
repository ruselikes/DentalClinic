import {React, useEffect, useState} from "react";
import {Container,Button, Col, Form, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// const bcrypt = require("bcryptjs");
// import AdminPage from "../Pages/AdminPage";
const RegPacientPage = () => {
const [staff, setStaff] = useState([]);
const [pacients, setPacients] = useState([]);
const [editingPacientId, setEditingPacientId] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletingPacientId, setDeletingPacientId] = useState(null);
const [password,setPassword] = useState('')

const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    middlename: '',
});

useEffect(() => {
    // Получение списка пациентов при загрузке компонента
    fetchPacients();

}, [pacients]);

const fetchPacients = async () => {
    try {
        const response = await fetch('http://localhost:5000/auth/users');
        const data = await response.json();
        setPacients(data);
        console.log("отлов пациентов нчался", pacients)
    } catch (error) {
        console.log(error);
    }
};




// Обработчик добавления пациента
const handleAddPacient = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            setPacients([...pacients, data.user]);

            // Очистка формы после успешной регистрации
            setFormData({
                email: '',
                password: '',
                name: '',
                surname: '',
                middlename: '',
            });
        } else {
            throw new Error('Ошибка при добавлении пациента');
        }
    } catch (error) {
        console.log(error);
        alert('Ошибка при отправке формы. Перепроверьте и отправьте еще раз!');
    }
};



const handleInputChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    });
};


const handleDeletePacient = (pacientId) => {

    setDeletingPacientId(pacientId.toString());

    console.log("перехват!",pacientId)
    setShowDeleteModal(true);
};

const confirmDeletePacient = async () => {
    try {
        await fetch(`http://localhost:5000/auth/delete/${deletingPacientId}`, {
            method: 'DELETE',
        });

        // Обновить список пациентов без удаленного пациента
        const updatedPacients = pacients.filter((pacient) => pacient._id !== deletingPacientId);
        setPacients(updatedPacients);
    } catch (error) {
        console.log(error);
    }
    setShowDeleteModal(false);
    setDeletingPacientId(null);
};

const cancelDeletePacient = () => {
    setShowDeleteModal(false);
    setDeletingPacientId(null);
};



const handleEditPacient = async (pacientId) => {
    // Найти пациента по ID и заполнить форму редактирования
    const pacientToEdit = pacients.find((pacient) => pacient._id === pacientId);
    // const decryptpass = await bcrypt.compare(password,pacientToEdit.password)
    setFormData({
        email: pacientToEdit.email,

        password: pacientToEdit.password,
        name: pacientToEdit.name,
        surname: pacientToEdit.surname,
        middlename: pacientToEdit.middlename,
    });
    setEditingPacientId(pacientId);
};




const handlePacFinishEditing = async () => {
    try {
        const response = await fetch(`http://localhost:5000/auth/edit/${editingPacientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();

        // Обновить список пациентов с обновленными данными
        const updatedPacients = pacients.map((pacient) =>
            pacient._id === data._id ? data : pacient
        );
        setPacients(updatedPacients);

        // Сбросить форму редактирования
        setFormData({
            email: '',
            password: '',
            name: '',
            surname: '',
            middlename: '',
        });
        setEditingPacientId(null);
    } catch (error) {
        console.log(error);
    }
};



return (
    <Container>
        <Row>
            <Col>
                <h2>Добавить пациента</h2>
                <Form onSubmit={handleAddPacient}>
                    <Form.Group controlId="pacientEmail">
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pacientPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pacientName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pacientSurname">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pacientMiddlename">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            type="text"
                            name="middlename"
                            value={formData.middlename}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Button style={{margin:"10px 0px"}} type="submit">Добавить пациента</Button>
                </Form>
                <h3>Список пациентов</h3>
                {console.log("список пациентов",pacients)}
                <ul>
                    {pacients.map((pacient) => (
                        <li key={pacient._id} style={{margin:"10px 0px"}}>
                            {pacient.name} {pacient.surname} {pacient.middlename}
                            <Button style={{margin:"0 10px"}} variant="primary" onClick={() => handleEditPacient(pacient._id)}>
                                Редактировать
                            </Button>
                            <Button variant="danger" onClick={() => handleDeletePacient(pacient._id)}>
                                Удалить
                            </Button>
                        </li>
                    ))}
                </ul>
                <Modal show={showDeleteModal} onHide={cancelDeletePacient}>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение удаления</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы точно хотите удалить пациента?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelDeletePacient}>
                            Отмена
                        </Button>
                        <Button variant="danger" onClick={confirmDeletePacient}>
                            Да
                        </Button>
                    </Modal.Footer>
                </Modal>
                {editingPacientId && (
                    <div>
                        <h2>Редактировать пациента</h2>
                        <Form onSubmit={handlePacFinishEditing}>
                            {/* Форма для редактирования данных пациента */}
                            <Form.Group controlId="editPacientEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="editPacientPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="editPacientName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="editPacientSurname">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="editPacientMiddlename">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="middlename"
                                    value={formData.middlename}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit">Завершить редактирование</Button>
                        </Form>
                    </div>
                )}
            </Col>

        </Row>
    </Container>
);
            };
export default RegPacientPage;