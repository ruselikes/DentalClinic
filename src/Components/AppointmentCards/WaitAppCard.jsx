import React, {useEffect, useState} from "react";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
export default function WaitAppCard({ appointment, setAppointments, appointments }){

    let status = '';
    let circleColor = '';
    const [doctor, setDoctor] = useState({})
    const [usluga, setUsluga] = useState({})
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsluga, setEditedUsluga] = useState(appointment.title);
    const [editedDoctor, setEditedDoctor] = useState(
        `${doctor.name} ${doctor.surname} ${doctor.middlename}`
    );
    const [editedDate, setEditedDate] = useState(
        ConvertData(appointment.appointmentDate)
    );
    const [selectedDate, setSelectedDate] = useState(null);
    const currentDateTime = new Date()
    function ConvertData(timeDelivered) {
        const date = new Date(timeDelivered);
        const hours = String(date.getHours()).padStart(2, '0'); // Get hours with leading zero if necessary
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes with leading zero if necessary

        const day = String(date.getDate()).padStart(2, '0'); // Get day of the month with leading zero if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (add 1 since it's zero-based) with leading zero if necessary
        const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year

        const formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`;
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSss",formattedDate); // Example output: 11:55,21.05.23
        return formattedDate;
    }
    if (appointment.status === "Предстоит") {
        status = 'Предстоит';
        circleColor = 'orange';
    } else {
        status = 'Завершен';
        circleColor = 'green';
    }
    const handleDateChange = (date) => {
        // Проверяем, выбрано ли дата и время, которые не ниже текущего момента
        if (date >= currentDateTime) {
            setSelectedDate(date);
        } else {
            // Обрабатываем ошибку, если выбрана некорректная дата и время
            alert('Выберите дату и время, не ранее текущего момента.');
        }
    };
    const fetchUsluga = async () => {
        try {

            console.log(appointment.doctorId)
            const response = await fetch(`http://localhost:5000/prices/${appointment.serviceId}`);
            const usluga = await response.json();
            setUsluga(usluga);
        } catch (error) {
            console.error("Ошибка при получении услуги в WAitAppCard", error);
        }
    };
    const fetchDoctor = async () => {
        try {

            console.log(appointment.doctorId)
            const response = await fetch(`http://localhost:5000/doctor/aboutdoc/${appointment.doctorId}`);
            const doc = await response.json();
            setDoctor(doc);
        } catch (error) {
            console.error("Ошибка при получении списка докторов", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {

        try {
            const response = await fetch(`http://localhost:5000/priem/edit/${appointment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    appointmentDate: selectedDate, // Присваиваем выбранную дату
                    appointmentTime: selectedDate
                }),
            })
        .then((response) => response.json())
                .then((data) => {
                    setAppointments(...appointments,data)
                    console.log("Данные успешно обновлены:", data);
                    alert("Все отправилось!")
                })
                .catch((error) => {
                    alert("Неотправилось!")
                    console.error("Ошибка при обновлении данных:", error);
                });


        } catch (error) {
            console.log(error);
        }


        setIsEditing(false);
    };
    useEffect(() => {
        fetchDoctor()
        fetchUsluga()

    }, []);
    return (
        <div
            style={{
                width: "90%",
                marginBottom: "20px",
                marginLeft: "10px",
                boxShadow: "0px 5px 20px 0px #00000040",
                padding: "20px",
                borderColor: "#343434",
                borderRadius: "10px",
            }}
        >
            {isEditing ? (
                <div>
                    <h6>Услуга: {usluga.title}</h6>
                    <h6>
                        Лечащий врач: {doctor.name}{" "}
                        {doctor.surname} {doctor.middlename}
                    </h6>
                    <p>{editedDate}</p>
                    <p>Новая дата приема:</p>

                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => handleDateChange(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        timeCaption="Время"
                        minDate={currentDateTime}
                        minTime={setHours(setMinutes(currentDateTime, 59), 7)}
                        maxTime={setHours(setMinutes(currentDateTime, 59), 16)}
                        dateFormat="d MMMM, yyyy HH:mm"
                        locale={ru}
                    />
                </div>
            ) : (
                <div>
                    <h6>Услуга: {usluga.title}</h6>
                    <h6>
                        Лечащий врач: {doctor.name}{" "}
                        {doctor.surname} {doctor.middlename}
                    </h6>
                    <p>{ConvertData(appointment.appointmentDate)}</p>
                </div>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: appointment.status === "Предстоит" ? "orange" : "green",
                        marginRight: "5px",
                    }}
                ></div>
                {isEditing ? (
                    <button onClick={handleSave}>Завершить редактирование</button>
                ) : (
                    <div>
                        <h6 style={{ marginBottom: "4px" }}>
                            {appointment.status === "Предстоит" ? "Предстоит" : "Завершен"}
                        </h6>
                        <button onClick={handleEdit}>Редактировать</button>
                    </div>
                )}
            </div>
        </div>
    )
}