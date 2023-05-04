import { useState,useContext} from 'react';
import {redirect, useNavigate} from "react-router-dom";

import {AuthContext} from '../../AuthContext'
const LoginForm = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
    try{
        // Отправка запроса на серверную часть
        // const userdata = await fetch('http://localhost:5000/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });
        // auth.login(userdata.token)

        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res =>
                res.json()
            ).then(userData => {auth.login(userData.token)})

            // .then(response => response.json())
            // .then( (datares)=> {
            //     if (datares.status === 200) {
            //         // Пользователь авторизован - сохраняем его ID в локальное хранилище
            //         // response.json().then(data => localStorage.setItem('userId', data.userId));
            //         // Перенаправление на страницу личного кабинета
            //         // redirect('/doctors');
            //         alert('Вошел!')
            //         const userData = datares
            //         auth.login(userData.token)
            //         // console.log(response.body)
            //     } else {
            //         // Ошибка авторизации - выводим сообщение об ошибке
            //         alert('Invalid login or password');
            //         // response.json({message:"блять сука"})
            //     }
            //
            // }

            .catch(error => console.log(error));
    }catch (e){
        console.log(e)
    }

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="text" name="username" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Добавить</button>
        </form>
    );
};
export default LoginForm;