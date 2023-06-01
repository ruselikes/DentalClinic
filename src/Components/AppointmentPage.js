import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { format, getHours, getMinutes,toDate  } from 'date-fns';




const AppointmentPage = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [doctor, setDoctor] = useState('');
    const [appointment,setAppointment] = useState('');
    const [password, setPassword] = useState('');
    const [pacient, setPacient] = useState('');
    const [uslugaData,setUslugaData] = useState("")
    const [userData,setUserData] = useState({user: {surname: null,name: null, email: null,middlename: null}})
    const [token, setToken] = useState(auth.token)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [description, setDescription] = useState('');
    const [min,setMin] = useState("")
    const [hours,setHours] = useState("")
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { id } = useParams();
    const navigate = useNavigate()
    console.log("Datatatatatat",selectedDate)
    useEffect(() => {
        console.log("Взять!", appointment);
    }, [appointment]);
    function ConvertData(timeDelivered) {
        const date = new Date(timeDelivered);
        const hours = String(date.getHours()).padStart(2, '0'); // Get hours with leading zero if necessary
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes with leading zero if necessary

        const day = String(date.getDate()).padStart(2, '0'); // Get day of the month with leading zero if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (add 1 since it's zero-based) with leading zero if necessary
        const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year

        const formattedDate = `${hours}:${minutes},${day}.${month}.${year}`;
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSss",formattedDate); // Example output: 11:55,21.05.23
        return formattedDate;
    }


    const fetchAppointment = async () => {
        try {

            const response = await fetch(`http://localhost:5000/priem/get/${id}`);
            const priem = await response.json();
            console.log("Взять прием!",priem)
            await setAppointment(priem);
            console.log("Взять!",appointment)
        } catch (error) {
            console.error("Ошибка при получении priem в Appoinment page", error);
        }
    };

    const fetchPacient = async () => {
        try {

            const response = await fetch(`http://localhost:5000/auth/me/${appointment.patientId}`);
            const pac = await response.json();
            await setPacient(pac);
        } catch (error) {
            console.error("Ошибка при получении списка pacients", error);
        }
    };
    const handleDateChange = async (date) => {
        const formattedDate = format(date, 'dd-MM-yyyy');
        const hours = getHours(date);
        const minutes = getMinutes(date);
        await setHours(hours)
        await setMin((minutes))
        setSelectedDate(formattedDate)


        console.log('Выбранная дата:', formattedDate);
        console.log('Выбранное время:', hours + ':' + minutes);

        console.log('Выбранная дата:', formattedDate);
        console.log('Выбранное время:', hours + ':' + minutes);
    };
    useEffect(() => {
        fetchAppointment()


    }, []);
    useEffect(()=>{
        getUslugaInfo()
        fetchPacient()
        fetchDoctor()},[appointment])




    const fetchDoctor = async () => {
        try {
            const response = await fetch(`http://localhost:5000/doctor/aboutdoc/${appointment.doctorId}`);
            const data = await response.json();
            setDoctor(data);
        } catch (error) {
            console.error("Ошибка при получении списка докторов", error);
        }
    };
    const handleSave = async () => {

        try {
            const response = await fetch(`http://localhost:5000/priem/editDescription/${appointment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    description: description, // Присваиваем выбранную дату
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // setAppointments(...appointments,data)
                    console.log("Данные успешно обновлены:", data);
                    alert("Все отправилось!")
                    navigate("/me")
                })
                .catch((error) => {
                    alert("Неотправилось!")
                    console.error("Ошибка при обновлении данных:", error);
                });


        } catch (error) {
            console.log(error);
        }

    };

    async function getUslugaInfo (){
        const usluga = await fetch(`http://localhost:5000/prices/${appointment.serviceId}`,
            {
                method: 'GET',

            }).then(res => res.json())

        if (usluga)
        {
            setUslugaData(usluga);
            console.log("Usluga дата",uslugaData)
        }
        else{
            alert("Произошла ошибка при получении услуги");
        }
    }
    const createAppoinment = async (event) =>{
        event.preventDefault();
        // ConvertData(selectedDate)
        // const appointmentDate = new Date(selectedDate);
        // const appointmentTime = new Date(selectedDate);
        try {
            const response = await fetch('http://localhost:5000/priem/addNew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    patientId: userInfo.id,
                    doctorId: selectedDoctor,
                    appointmentDate: selectedDate, // Присваиваем выбранную дату
                    appointmentTime: selectedDate,
                    serviceId: id
                })
            });

            if (response.ok) {
                const zapis = await response.json();
                console.log(zapis)
                alert("Успешная запись!")
                setSelectedDoctor("");
                setSelectedDate(null);
                // Очистка формы после успешной регистрации

            } else {
                throw new Error('Ошибка при записи');
            }
        } catch (error) {
            console.log(error);
            alert('Ошибка при записи. Перепроверьте и отправьте еще раз!');
        }
    };

    const handleInputChange = (event) => {
        setDescription(event.target.value);
    };

    if (userInfo === null) {
        return (<h1>Авторизируйтесь</h1>); // Возвращаем null, если userInfo равно null
    }
    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    return (
        <div className="cont">
            <h2>{`${uslugaData.title} Стоимость услуги: ${uslugaData.price} рублей`}</h2>

            <p>Лечащий врач: {doctor.name} {doctor.surname} {doctor.middlename}</p>
            <p>Пациент: {pacient.name} {pacient.surname} {pacient.middlename}</p>

            <input type="text" value={description} onChange={handleInputChange} />

            <button onClick={handleSave}>Завершить прием</button>
            {console.log(typeof(selectedDate))}
        </div>
    );
};

export default AppointmentPage;