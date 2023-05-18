import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";

const AboutMe = () => {
    const [email, setEmail] = useState('');
    const auth = useContext(AuthContext)
    const [password, setPassword] = useState('');
    const [userData,setUserData] = useState({user: {surname: null,name: null, email: null,middlename: null}})
    const [token, setToken] = useState(auth.token)

    console.log("token (перед ним стоит token = auth.token: ",auth.token)
    useEffect(() => {
        console.log("auth.token внутри эффекта: ",auth.token)
        fetch('http://localhost:5000/auth/me',
            {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', // суть ошибки здесь, token не такой, или не так передается
            'Authorization':`Bearer ${auth.token}`}
            })

            .then(res => res.json())
            .then(user => {if (user.user)
                {setUserData(user);console.log("Юзер дата",userData, userData.user.surname,"user.user",user.user)}
                else{
                    alert("Произошла ошибка при получении");
            }
            })
            .catch(error => console.error(error));


    }, [token,userData]);

    return (
        <div>
            <h2>{`${userData.user.surname} ${userData.user.name} ${userData.user.middlename}`}</h2>
            <p>Email: {userData.user.email}</p>
        </div>
    );
};

export default AboutMe;