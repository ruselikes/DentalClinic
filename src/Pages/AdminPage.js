import  { React,useState ,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
const AdminPage = () => {
    // State для данных докторов и персонала

    const [staff, setStaff] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStaffDeleteModal, setShowStaffDeleteModal] = useState(false);
    const [deletingDoctorId, setDeletingDoctorId] = useState(null);
    const [editingStaffId, setEditingStaffId] = useState(null);
    const [deletingStaffId, setDeletingStaffId] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        middlename: '',
    });
    const [formStaffData, setFormStaffData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        middlename: '',
    });
    useEffect(() => {
        // Получение списка докторов при загрузке компонента
        fetchDoctors();
        fetchStaff()
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
    const fetchStaff = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/staff/getAll');
            const data = await response.json();
            setStaff(data);
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
            });

            if (response.ok) {
                const data = await response.json();
                setDoctors([...doctors, data]);
                // Очистка формы после успешной регистрации
                setFormData({
                    email: '',
                    password: '',
                    name: '',
                    surname: '',
                    middlename: '',
                });
            } else {
                throw new Error('Ошибка при добавлении доктора');
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
    const handleInputStaffChange = (event) => {
        setFormStaffData({
            ...formStaffData,
            [event.target.name]: event.target.value,
        });
    };

    const handleDeleteDoctor = (doctorId) => {

        setDeletingDoctorId(doctorId.toString());

        console.log("перехват!",doctorId)
        setShowDeleteModal(true);
    };
    const handleDeleteStaff = (staffId) => {

        setDeletingStaffId(staffId.toString());

        console.log("перехват!",staffId)
        setShowStaffDeleteModal(true);
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
    const confirmDeleteStaff = async () => {
        try {
            await fetch(`http://localhost:5000/admin/stuff/del/${deletingStaffId}`, {
                method: 'DELETE',
            });

            // Обновить список докторов без удаленного доктора
            const updatedStaff = staff.filter((staff) => staff._id !== deletingStaffId);
            setStaff(updatedStaff);
        } catch (error) {
            console.log(error);
        }
        setShowStaffDeleteModal(false);
        setDeletingStaffId(null);
    };
    const cancelDeleteDoctor = () => {
        setShowDeleteModal(false);
        setDeletingDoctorId(null);
    };
    const cancelDeleteStaff = () => {
        setShowStaffDeleteModal(false);
        setDeletingStaffId(null);
    };


    const handleEditDoctor = (doctorId) => {
        // Найти доктора по ID и заполнить форму редактирования
        const doctorToEdit = doctors.find((doctor) => doctor._id === doctorId);
        setFormData({
            email: doctorToEdit.email,
            password: doctorToEdit.password,
            name: doctorToEdit.name,
            surname: doctorToEdit.surname,
            middlename: doctorToEdit.middlename,
        });
        setEditingDoctorId(doctorId);
    };

    const handleEditStaff = (staffId) => {
        // Найти доктора по ID и заполнить форму редактирования
        const stuffToEdit = staff.find((s) => s._id === staffId);
        setFormData({
            email: stuffToEdit.email,
            password: stuffToEdit.password,
            name: stuffToEdit.name,
            surname: stuffToEdit.surname,
            middlename: stuffToEdit.middlename,
        });
        setEditingStaffId(staffId);
    };


    const handleDocFinishEditing = async () => {
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
    const handleStaffFinishEditing = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/stuff/edit/${editingStaffId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formStaffData),
            });
            const data = await response.json();

            // Обновить список докторов с обновленными данными
            const updatedStaffs = staff.map((st) =>
                st._id === data._id ? data : st
            );
            setDoctors(updatedStaffs);

            // Сбросить форму редактирования
            setFormStaffData({
                email: '',
                password: '',
                name: '',
                surname: '',
                middlename: '',
            });
            setEditingStaffId(null);
        } catch (error) {
            console.log(error);
        }
    };

    // Обработчик добавления персонала
    const handleAddStaff = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/admin/staff/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formStaffData),
            });

            if (response.ok) {
                const data = await response.json();
                setStaff([...staff, data]);
                // Очистка формы после успешной регистрации
                // setFormStaffData({
                //     email: '',
                //     password: '',
                //     name: '',
                //     surname: '',
                //     middlename: '',
                // });
                event.target.reset();
            } else {
                throw new Error('Ошибка при добавлении staff');
            }
        } catch (error) {
            console.log(error);
            alert('Ошибка при отправке формы. Перепроверьте и отправьте еще раз!');
        }
        // Добавление нового сотрудника в список

        // Сброс формы

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
                            <Form onSubmit={handleDocFinishEditing}>
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



                {/*///Пероснал*/}
                <Col>
                    <h2>Добавить персонал</h2>
                    <Form onSubmit={handleAddStaff}>
                        <Form.Group controlId="staffEmail">
                            <Form.Label>Электронная почта</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formStaffData.email}
                                onChange={handleInputStaffChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="staffPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formStaffData.password}
                                onChange={handleInputStaffChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="staffName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formStaffData.name}
                                onChange={handleInputStaffChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="doctorSurname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={formStaffData.surname}
                                onChange={handleInputStaffChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="staffMiddlename">
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                name="middlename"
                                value={formStaffData.middlename}
                                onChange={handleInputStaffChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">Добавить регистратора</Button>
                    </Form>
                    <h3>Список персонала</h3>
                    <ul>
                        {staff.map((registrator) => (
                            <li key={registrator._id}>
                                <h6>{registrator._id}{typeof(registrator._id)}</h6>
                                {registrator.name} {registrator.surname} - {registrator.middlenames}
                                <Button variant="link" onClick={() => handleEditStaff(registrator._id)}>
                                    Редактировать
                                </Button>
                                <Button variant="link" onClick={() => handleDeleteStaff(registrator._id)}>
                                    Удалить
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Modal show={showStaffDeleteModal} onHide={cancelDeleteStaff}>
                        <Modal.Header closeButton>
                            <Modal.Title>Подтверждение удаления</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы точно хотите удалить регистратора?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cancelDeleteStaff}>
                                Отмена
                            </Button>
                            <Button variant="danger" onClick={confirmDeleteStaff}>
                                Да
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {editingStaffId && (
                        <div>
                            <h2>Редактировать регистратора</h2>
                            <Form onSubmit={handleStaffFinishEditing}>
                                {/* Форма для редактирования данных доктора */}
                                <Form.Group controlId="editStaffEmail">
                                    <Form.Label>Электронная почта</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formStaffData.email}
                                        onChange={handleInputStaffChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editStaffPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formStaffData.password}
                                        onChange={handleInputStaffChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editStaffName">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formStaffData.name}
                                        onChange={handleInputStaffChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editStaffSurname">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        value={formStaffData.surname}
                                        onChange={handleInputStaffChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="editStaffMiddlename">
                                    <Form.Label>Отчество</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="middlename"
                                        value={formStaffData.middlename}
                                        onChange={handleInputStaffChange}
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

export default AdminPage;