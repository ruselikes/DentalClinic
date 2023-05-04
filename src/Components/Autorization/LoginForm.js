import { useState } from 'react';
import {redirect, useNavigate} from "react-router-dom";


const LoginForm = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        // Отправка запроса на серверную часть
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.status === 200) {
                    // Пользователь авторизован - сохраняем его ID в локальное хранилище
                    // response.json().then(data => localStorage.setItem('userId', data.userId));
                    // Перенаправление на страницу личного кабинета
                    // redirect('/doctors');
                    alert('Вошел!')
                    // console.log(response.body)
                } else {
                    // Ошибка авторизации - выводим сообщение об ошибке
                    // alert('Invalid login or password');
                    // response.json({message:"блять сука"})
                }
            })
            .catch(error => console.log(error));
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