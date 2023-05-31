import {useEffect, useState} from "react";

export default function WaitAppCard({appointment}){

    let status = '';
    let circleColor = '';


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
    const [doctor, setDoctor] = useState({})
    const [usluga, setUsluga] = useState({})
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


    useEffect(() => {
        fetchDoctor()
        fetchUsluga()

    }, []);
    return (
        <div style={{width:"90%",marginBottom:"20px", marginLeft:"10px", boxShadow: "0px 5px 20px 0px #00000040",padding: "20px", borderColor:"#343434",borderRadius:"10px"}}>
            <h6>Услуга: {usluga.title}</h6>
            <h6>Лечащий врач:{doctor.name} {doctor.surname} {doctor.middlename}</h6>
            <p>{ConvertData(appointment.appointmentDate)}</p>


             <div style={{ display: 'flex', alignItems: 'center' }}>
                 <div
                     style={{
                         width: '12px',
                         height: '12px',
                        borderRadius: '50%',
                        backgroundColor: circleColor,
                        marginRight: '5px',
                    }}
                ></div>
                <h6 style={{marginBottom: "4px"}}>{status}</h6>
            </div>
        </div>
    )
}