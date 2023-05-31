import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import "./Me.css"

const AboutMe = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [password, setPassword] = useState('');
    const [userData,setUserData] = useState({user: {surname: null,name: null, email: null,middlename: null}})
    const [token, setToken] = useState(auth.token)

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("usInfo",userInfo)
    async function getAboutMe (){
        const pacient = await fetch('http://localhost:5000/auth/me',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', // суть ошибки здесь, token не такой, или не так передается
                    'Authorization':`Bearer ${userInfo.token}`}
            }).then(user => user.json())

            if (pacient)
            {
                setUserData(pacient);
                console.log("Юзер дата",userData, userData.user.surname)
            }
            else{
                alert("Произошла ошибка при получении юзера");
            }
            }
    console.log("token (перед ним стоит token = auth.token: ",auth.token)
    useEffect(() => {
        getAboutMe()


    }, []);

    if (userInfo === null) {
        return (<h1>Авторизируйтесь</h1>); // Возвращаем null, если userInfo равно null
    }


    return (
        <div className="cont">
            <h2>{`${userData.user.surname} ${userData.user.name} ${userData.user.middlename}`}</h2>
            <p>Email: {userData.user.email}</p>
        </div>
    );
};


// <div className="container" style={{marginTop: "50px"}}>
//     <p>Курьер: <b>{courier.name + " " + courier.surname}</b></p>
//     <Row>
//         <Col>
//             <Tabs>
//                 <Tab eventKey="home" title="Активный маршрут">
//
//                     <div style={{
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         flexDirection: 'column'
//                     }}>
//                         <div className="overflow-auto h-100" style={{maxHeight: "550px"}}>
//                             {Array.isArray(routes) ? routes.map((route) => {
//                                 if (route.isDelivered === false) {
//                                     return (
//                                         <ActiveRouteCard pr_route={route}
//                                                          refresh={{func: setRoutes, auth: auth.userId}}/>
//                                     )
//                                 }
//                                 return null;
//                             }) : []}
//                         </div>
//                     </div>
//
//                 </Tab>
//                 <Tab eventKey="profile" title="Завершенные маршруты">
//
//                     <div style={{
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         flexDirection: 'column'
//                     }}>
//                         <div className="overflow-auto h-100" style={{maxHeight: "480px", paddingTop: '10px'}}>
//                             {Array.isArray(routes) ? routes.map((route) => {
//                                     if (route.isDelivered === true) {
//                                         return <RouteCard pr_route={route} key={route._id}/>
//                                     }
//                                     return null;
//                                 }
//                             ) : []}
//                         </div>
//                     </div>
//                 </Tab>
//             </Tabs>
//         </Col>
//
//         <Col style={{height: '550px'}} xs={7}>
//             <Map/>
//         </Col>
//
//     </Row>
// </div>

export default AboutMe;