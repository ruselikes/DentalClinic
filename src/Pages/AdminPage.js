import  { React,useState ,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
const AdminPage = () => {
    // State для данных докторов и персонала

    const [staff, setStaff] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingDoctorId, setDeletingDoctorId] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        middlename: '',
    });
    useEffect(() => {
        // Получение списка докторов при загрузке компонента
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/doctor/getAll');
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.log(error);
        }
    };



    // Обработчик добавления доктора
    const handleAddDoctor = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/admin/doctor/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then( res => res.json()).then
            (
                data => {
                    setDoctors([...doctors, data]);
                    // Очистка формы после успешной регистрации
                    setFormData({
                        email: '',
                        password: '',
                        name: '',
                        surname: '',
                        middlename: '',
                    })
                }

            ).catch(er => alert("Ошибка при отправке формы. Перепроверьте и отпраьте еще раз!"))


        } catch (error) {
            console.log(error);
        }
    };
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleDeleteDoctor = (doctorId) => {

        setDeletingDoctorId(doctorId.toString());

        console.log("перехват!",doctorId)
        setShowDeleteModal(true);
    };
    const confirmDeleteDoctor = async () => {
        try {
            await fetch(`http://localhost:5000/admin/doctor/del/${deletingDoctorId}`, {
                method: 'DELETE',
            });

            // Обновить список докторов без удаленного доктора
            const updatedDoctors = doctors.filter((doctor) => doctor._id !== deletingDoctorId);
            setDoctors(updatedDoctors);
        } catch (error) {
            console.log(error);
        }
        setShowDeleteModal(false);
        setDeletingDoctorId(null);
    };
    const cancelDeleteDoctor = () => {
        setShowDeleteModal(false);
        setDeletingDoctorId(null);
    };


    const handleEditDoctor = (doctorId) => {
        // Найти доктора по ID и заполнить форму редактирования
        const doctorToEdit = doctors.find((doctor) => doctor._id === doctorId);
        setFormData({
            email: doctorToEdit.email,
            password: doctorToEdit.password,
            name: doctorToEdit.name,
            surname: doctorToEdit.surname,
            middlename: doctorToEdit.middlenames,
        });
        setEditingDoctorId(doctorId);
    };


    const handleFinishEditing = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/doctor/edit/${editingDoctorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            // Обновить список докторов с обновленными данными
            const updatedDoctors = doctors.map((doctor) =>
                doctor._id === data._id ? data : doctor
            );
            setDoctors(updatedDoctors);

            // Сбросить форму редактирования
            setFormData({
                email: '',
                password: '',
                name: '',
                surname: '',
                middlename: '',
            });
            setEditingDoctorId(null);
        } catch (error) {
            console.log(error);
        }
    };

    // Обработчик добавления персонала
    const handleAddStaff = (event) => {
        event.preventDefault();
        // Получение данных из формы
        const { name, surname, middlename } = event.target.elements;
        // Создание нового сотрудника
        const newStaffMember = {
            name: name.value,
            surname: surname.value,
            middlename: middlename.value,
        };
        // Добавление нового сотрудника в список
        setStaff((prevStaff) => [...prevStaff, newStaffMember]);
        // Сброс формы
        event.target.reset();
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Добавить доктора</h2>
                    <Form onSubmit={handleAddDoctor}>
                        <Form.Group controlId="doctorEmail">
                            <Form.Label>Электронная почта</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="doctorPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="doctorName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="doctorSurname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="doctorMiddlename">
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                name="middlename"
                                value={formData.middlename}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">Добавить доктора</Button>
                    </Form>
                    <h3>Список докторов</h3>
                    {console.log("список докторов",doctors)}
                    <ul>
                        {doctors.map((doctor) => (
                            <li key={doctor._id}>
                                <h6>{doctor._id}{typeof(doctor._id)}</h6>
                                {doctor.name} {doctor.surname} - {doctor.middlenames}
                                <Button variant="link" onClick={() => handleEditDoctor(doctor._id)}>
                                    Редактировать
                                </Button>
                                <Button variant="link" onClick={() => handleDeleteDoctor(doctor._id)}>
                                    Удалить
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Modal show={showDeleteModal} onHide={cancelDeleteDoctor}>
                        <Modal.Header closeButton>
                            <Modal.Title>Подтверждение удаления</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы точно хотите удалить доктора?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cancelDeleteDoctor}>
                                Отмена
                            </Button>
                            <Button variant="danger" onClick={confirmDeleteDoctor}>
                                Да
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {editingDoctorId && (
                        <div>
                            <h2>Редактировать доктора</h2>
                            <Form onSubmit={handleFinishEditing}>
                                {/* Форма для редактирования данных доктора */}
                                <Form.Group controlId="editDoctorEmail">
                                    <Form.Label>Электронная почта</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editDoctorPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editDoctorName">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editDoctorSurname">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editDoctorMiddlename">
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


                <Col>
                    <h2>Добавить персонал</h2>
                    <Form onSubmit={handleAddStaff}>
                        <Form.Group controlId="staffName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" name="name" required />
                        </Form.Group>
                        <Form.Group controlId="staffSurname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control type="text" name="surname" required />
                        </Form.Group>
                        <Form.Group controlId="staffMiddlename">
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control type="text" name="middlename" required />
                        </Form.Group>
                        <Button type="submit">Добавить персонал</Button>
                    </Form>
                    <h3>Список персонала</h3>
                    <ul>
                        {staff.map((staffMember, index) => (
                            <li key={index}>
                                {staffMember.name} {staffMember.surname} - {staffMember.middlename}
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPage;