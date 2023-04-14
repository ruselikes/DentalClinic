import { useState } from 'react';

const LoginForm = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        // Отправка запроса на серверную часть
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.status === 200) {
                    // Пользователь авторизован - сохраняем его ID в локальное хранилище
                    response.json().then(data => localStorage.setItem('userId', data.userId));
                    // Перенаправление на страницу личного кабинета
                    history.push('/doctors');
                    console.log(response.body)
                } else {
                    // Ошибка авторизации - выводим сообщение об ошибке
                    alert('Invalid login or password');
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};
export default LoginForm;