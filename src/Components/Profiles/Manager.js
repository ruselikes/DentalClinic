import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import WaitAppCard from "../AppointmentCards/WaitAppCard";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import AboutMe from "../Autorization/Me";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";




const ManProfile = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [password, setPassword] = useState('');

    const [token, setToken] = useState(auth.token)
    const [userData,setUserData] = useState({surname: null,name: null, email: null,middlename: null})
    const [pacients,setPacients] = useState([])
    const [services,setServices] = useState([])
    const [doctors,setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [selectedPacient, setSelectedPacient] = useState("");
    const [appointments,setAppointments] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const dropdownStyle = {
        margin: '10px 0',
        width: "400px",
        // boxShadow: "0px 5px 20px 0px #00000040",
        borderRadius: "5px",
        fontFamily: 'Montserrat, sans-serif'
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getPacient = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/auth/users`);
            const data = await response.json();
            setPacients(data)
            console.log("ПАциенты получены:",data);
        } catch (error) {
            console.error("Ошибка при получении списка пациентов", error);
        }
    }
    const getZapisi = async (pacientId)=>{
        try {
            const response = await fetch(`http://localhost:5000/priem/getMy/${pacientId}`);
            const data = await response.json();
            setAppointments(data)
            console.log("zapisi",data);
        } catch (error) {
            console.error("Ошибка при получении списка докторов", error);
        }
    }
    const getServices = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/prices`);
            const data = await response.json();
            setServices(data)
            console.log("Servisi получены:",data);
        } catch (error) {
            console.error("Ошибка при получении списка Services", error);
        }
    }
    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };
    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };
    const handlePacientChange = async (event) => {
        await setSelectedPacient(event.target.value);
        await getZapisi(selectedPacient)
    };
    const createAppoinment = async (event) =>{
        event.preventDefault();
        console.log("Ловлю дату ",selectedDate)
        // ConvertData(selectedDate)
        // const appointmentDate = new Date(selectedDate);
        // const appointmentTime = new Date(selectedDate);
        try {
            if (selectedDate != null)
            {
                const response = await fetch('http://localhost:5000/priem/addNew', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        patientId: selectedPacient,
                        doctorId: selectedDoctor,
                        appointmentDate: selectedDate, // Присваиваем выбранную дату
                        appointmentTime: selectedDate,
                        serviceId: selectedService
                    })
                });

             if (response.ok) {
                    const zapis = await response.json();
                    console.log(zapis)
                    alert("Успешная запись!")
                    setSelectedDoctor("");
                    setSelectedDate(null);
                    setSelectedPacient("")
                    setSelectedService("")

                    // Очистка формы после успешной регистрации

                } else {
                    throw new Error('Ошибка при записи');
                }
            }
            else {
                throw new Error('Ошибка при записи');
            }
        } catch (error) {
            console.log(error);
            alert('Ошибка при записи. Перепроверьте и отправьте еще раз!');
        }
    };
    const getDoctors = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/admin/doctor/getAll`);
            const data = await response.json();
            setDoctors(data)
            console.log("Doctors получены:",data);
        } catch (error) {
            console.error("Ошибка при получении списка doctors", error);
        }
    }
    async function getAboutMe () {
        const man = await fetch(`http://localhost:5000/staff/about/${userInfo.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // суть ошибки здесь, token не такой, или не так передается

                }
            }).then(user => user.json())

        if (man) {
            setUserData(man);
            console.log("Юзер дата", userData, userData.surname)
        } else {
            alert("Произошла ошибка при получении юзера");
        }
    }
    console.log("token (перед ним стоит token = auth.token: ",auth.token)
    useEffect(() => {
        getAboutMe()
        getDoctors()
        getPacient()
        getServices()
        // getZapisi()


    }, []);
    useEffect(() => {

        getZapisi(selectedPacient)


    }, [selectedPacient]);

    return (
        <>
            <div className="cont">
                <h2>{`${userData.surname} ${userData.name} ${userData.middlename}`}</h2>
                <p>Email: {userData.email}</p>
            </div>
            <div className="container" style={{marginTop: "50px"}}>

                <Row>
                    <Col>
                        <Tabs>
                            <Tab eventKey="add-patient" title="Добавить пациента">

                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: 'column'
                                }}>
                                    <div className="overflow-auto h-100" style={{maxHeight: "550px"}}>
                                        {Array.isArray(doctors) ? doctors.map((doc) => {

                                                return ( <h1>{doc.name}</h1>
                                                    // <WaitAppCard appointment={doc} key={doc._id}/>
                                                )


                                        }) : []}
                                        <p>sdads</p>
                                        {Array.isArray(pacients) ? pacients.map((pac) => {

                                            return ( <h1>{pac.name}</h1>
                                                // <WaitAppCard appointment={doc} key={doc._id}/>
                                            )


                                        }) : []}

                                    </div>
                                </div>

                            </Tab>
                            <Tab eventKey="create-appointment" title="Записать на прием">

                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: 'column'
                                }}>
                                {/*    <select value={selectedService} onChange={handlePacientChange}>*/}
                                {/*        <option value="">Выберите Пациента</option>*/}
                                {/*        {pacients.map((pac) => (*/}
                                {/*            <option key={pac._id} value={pac._id}>*/}
                                {/*                {pac.name+" "+pac.surname+" "+ pac.middlename}*/}
                                {/*            </option>*/}
                                {/*        ))}*/}
                                {/*    </select>*/}
                                {/* <select value={selectedService} onChange={handleServiceChange}>*/}
                                {/*        <option value="">Выберите услугу</option>*/}
                                {/*        {services.map((service) => (*/}
                                {/*            <option key={service._id} value={service._id}>*/}
                                {/*                {service.title}*/}
                                {/*            </option>*/}
                                {/*        ))}*/}
                                {/* </select>*/}
                                {/*<select value={selectedDoctor} onChange={handleDoctorChange}>*/}
                                {/*    <option value="">Выберите доктора</option>*/}
                                {/*    {doctors.map((doctor) => (*/}
                                {/*        <option key={doctor._id} value={doctor._id}>*/}
                                {/*            {doctor.name+" "+doctor.surname+" "+ doctor.middlename}*/}
                                {/*        </option>*/}
                                {/*    ))}*/}
                                {/*</select>*/}
                                {/*    <DatePicker*/}
                                {/*        selected={selectedDate}*/}
                                {/*        onChange={date => setSelectedDate(date)}*/}
                                {/*        showTimeSelect*/}
                                {/*        timeFormat="HH:mm"*/}
                                {/*        timeIntervals={60}*/}
                                {/*        timeCaption="Время"*/}
                                {/*        dateFormat="d MMMM, yyyy HH:mm"*/}
                                {/*        locale={ru}*/}
                                {/*    />*/}
                                {/*    <button onClick={createAppoinment}>Записать на прием</button>*/}
                                    <div className="overflow-auto h-100" style={{maxHeight: "550px"}}>
                                        {/*{Array.isArray(appointments) ? appointments.map((priem) => {*/}
                                        {/*    if (priem.status === "Завершен") {*/}
                                        {/*        return (*/}
                                        {/*            <WaitAppCard appointment={priem} key={priem._id}/>*/}
                                        {/*        )*/}
                                        {/*    }*/}
                                        {/*    return null;*/}
                                        {/*}) : []}*/}
                                    </div>
                                    <select value={selectedPacient} onChange={handlePacientChange} style={dropdownStyle}>
                                        <option value="">Выберите Пациента</option>
                                        {pacients.map((pac) => (
                                            <option key={pac._id} value={pac._id}>
                                                {pac.name + " " + pac.surname + " " + pac.middlename}
                                            </option>
                                        ))}
                                    </select>

                                    <select value={selectedService} onChange={handleServiceChange} style={dropdownStyle}>
                                        <option value="">Выберите услугу</option>
                                        {services.map((service) => (
                                            <option key={service._id} value={service._id}>
                                                {service.title}
                                            </option>
                                        ))}
                                    </select>

                                    <select value={selectedDoctor} onChange={handleDoctorChange} style={dropdownStyle}>
                                        <option value="">Выберите доктора</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor._id} value={doctor._id}>
                                                {doctor.name + " " + doctor.surname + " " + doctor.middlename}
                                            </option>
                                        ))}
                                    </select>

                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={60}
                                        timeCaption="Время"
                                        dateFormat="d MMMM, yyyy HH:mm"
                                        locale={ru}
                                    />

                                    <button onClick={createAppoinment}>Записать на прием</button>

                                </div>
                            </Tab>
                            <Tab eventKey="edit-appointment" title="Редактировать прием">

                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: 'column'
                                }}>
                                    <select value={selectedPacient} onChange={handlePacientChange} style={dropdownStyle}>
                                        <option value="">Выберите Пациента</option>
                                        {pacients.map((pac) => (
                                            <option key={pac._id} value={pac._id}>
                                                {pac.name + " " + pac.surname + " " + pac.middlename}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="overflow-auto h-100" style={{maxHeight: "550px"}}>
                                        {Array.isArray(appointments) ? appointments.map((priem) => {
                                            if (priem.status === "Предстоит") {
                                                return (
                                                    <WaitAppCard appointment={priem} key={priem._id}/>
                                                )
                                            }
                                            return null;
                                        }) : []}
                                    </div>

                                    {/*<div className="overflow-auto h-100" style={{maxHeight: "550px"}}>*/}
                                    {/*    /!*{Array.isArray(appointments) ? appointments.map((priem) => {*!/*/}
                                    {/*    /!*    if (priem.status === "Предстоит") {*!/*/}
                                    {/*    /!*        return (*!/*/}
                                    {/*    /!*            <WaitAppCard appointment={priem} key={priem._id}/>*!/*/}
                                    {/*    /!*        )*!/*/}
                                    {/*    /!*    }*!/*/}
                                    {/*    /!*    return null;*!/*/}
                                    {/*    /!*}) : []}*!/*/}
                                    {/*</div>*/}
                                </div>

                            </Tab>
                        </Tabs>
                    </Col>

                    {/*<Col style={{height: '550px'}} xs={7}>*/}
                    {/*ыфвы*/}
                    {/*</Col>*/}

                </Row>
            </div>
        </>
    );
}
export default ManProfile;