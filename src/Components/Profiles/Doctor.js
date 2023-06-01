import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from 'react-router-dom';
import DocAppCard from "../AppointmentCards/DocAppcard";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import AboutMe from "../Autorization/Me";




const DocProfile = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [password, setPassword] = useState('');
    const [userData,setUserData] = useState({surname: null,name: null, email: null,middlename: null})
    const [token, setToken] = useState(auth.token)

    const [appointments,setAppointments] = useState([])

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getZapisi = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/priem/getDocApps/${userInfo.id}`);
            const data = await response.json();
            setAppointments(data)
            console.log("zapisi",data);
        } catch (error) {
            console.error("Ошибка при получении списка докторов", error);
        }
    }
    async function getAboutMe () {
        const doctor = await fetch(`http://localhost:5000/doctor/aboutdoc/${userInfo.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // суть ошибки здесь, token не такой, или не так передается

                }
            }).then(user => user.json())

        if (doctor) {
            setUserData(doctor);
            console.log("Юзер дата", userData, userData.surname)
        } else {
            alert("Произошла ошибка при получении доктора");
        }
    }
    console.log("token (перед ним стоит token = auth.token: ",auth.token)
    useEffect(() => {
        getAboutMe()
        getZapisi()


    }, []);

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
                            <Tab eventKey="home" title="Предстоящие посещения">

                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: 'column'
                                }}>
                                    <div className="overflow-auto h-100" style={{maxHeight: "550px"}}>
                                        {Array.isArray(appointments) ? appointments.map((priem) => {
                                            if (priem.status === "Предстоит") {
                                                return (
                                                    <Link style={{textDecoration:"none"}} to={`/priem/${priem._id}`}>
                                                        <DocAppCard appointment={priem} key={priem._id}/>
                                                    </Link>
                                                    //
                                                )
                                            }
                                            return null;
                                        }) : []}
                                    </div>
                                </div>

                            </Tab>
                            <Tab eventKey="profile" title="Завершенные приемы">

                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: 'column'
                                }}>
                                    <div className="overflow-auto h-100" style={{maxHeight: "550px"}}>
                                        {Array.isArray(appointments) ? appointments.map((priem) => {
                                            if (priem.status === "Завершен") {
                                                return (
                                                    <DocAppCard appointment={priem} key={priem._id}/>
                                                )
                                            }
                                            return null;
                                        }) : []}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>

                    <Col style={{height: '550px'}} xs={7}>

                    </Col>

                </Row>
            </div>
        </>
    );
}
export default DocProfile;