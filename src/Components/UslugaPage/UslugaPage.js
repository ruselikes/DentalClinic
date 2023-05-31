import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import {useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { format, getHours, getMinutes,toDate } from 'date-fns';



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
        "выбранный",selectedDoctor._id,
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
                onChange={date => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Время"
                dateFormat="d MMMM, yyyy HH:mm"
                locale={ru}
            />
            {console.log(typeof(selectedDate))}
        </div>
    );
};

export default UslugaPage;