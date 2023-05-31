import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import {useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { format, getHours, getMinutes,toDate,zonedTimeToUtc  } from 'date-fns';




const UslugaPage = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [doctors, setDoctors] = useState([]);
    const [password, setPassword] = useState('');
    const [uslugaData,setUslugaData] = useState("")
    const [userData,setUserData] = useState({user: {surname: null,name: null, email: null,middlename: null}})
    const [token, setToken] = useState(auth.token)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [min,setMin] = useState("")
    const [hours,setHours] = useState("")

    const { id } = useParams();
    console.log("Datatatatatat",selectedDate)

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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    console.log("Огромная пачка данных","юзер инфом",userInfo,
        "айди услуги",id,
        "доктора",doctors,
        "выбранный",selectedDoctor,
        )


    const fetchDoctors = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/doctor/getAll");
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error("Ошибка при получении списка докторов", error);
        }
    };
    async function getUslugaInfo (){
        const usluga = await fetch(`http://localhost:5000/prices/${id}`,
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
        ConvertData(selectedDate)
        const appointmentDate = new Date(selectedDate);
        const appointmentTime = new Date(selectedDate);
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
                })
            });

            if (response.ok) {
                const zapis = await response.json();
                console.log(zapis)
                // Очистка формы после успешной регистрации

            } else {
                throw new Error('Ошибка при записи');
            }
        } catch (error) {
            console.log(error);
            alert('Ошибка при записи. Перепроверьте и отправьте еще раз!');
        }
    };
    useEffect(() => {
        getUslugaInfo()
        fetchDoctors()

    }, []);

    if (userInfo === null) {
        return (<h1>Авторизируйтесь</h1>); // Возвращаем null, если userInfo равно null
    }
    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    return (
        <div className="cont">
            <h2>{`${uslugaData.title} ${uslugaData.text} ${uslugaData.price}`}</h2>
            <p>Email: {userData.user.email}</p>

            <select value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">Выберите доктора</option>
                {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name+" "+doctor.surname+" "+ doctor.middlename}
                    </option>
                ))}
            </select>
            <p>Выбранный доктор: {selectedDoctor}</p>
            <DatePicker
                selected={selectedDate}
                onChange={date =>
                {   const selectedDate = zonedTimeToUtc (date, '+03:00');

                    // Форматирование выбранной даты и времени
                    const formattedDate = format(selectedDate, 'dd-MM-yyyy HH:mm:ss');
                    setSelectedDate(formattedDate);

                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Время"
                dateFormat="d MMMM, yyyy HH:mm"
                locale={ru}
            />
            <button onClick={createAppoinment}>Записаться</button>
            {console.log(typeof(selectedDate))}
        </div>
    );
};

export default UslugaPage;