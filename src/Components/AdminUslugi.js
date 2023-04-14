// import {useState} from "react";
//
// export default function UslugiPage ()
// {
//     const [posts,setPosts] = useState({title: "", text: "", posts: []}
//     )
//     const handleChange = (e) => {
//     setPosts({[e.target.name]: e.target.value});
// }
//
//     const handleSubmit = (e) => {
//     e.preventDefault();
//     let post = {
//         title: this.state.title,
//         text: this.state.text
//     }
//     return (
//         <div className="container">
//             <h1>Первый блог на React</h1>
//             <hr/>
//             <form className="form" onSubmit={this.handleSubmit}>
//                 <div className="mb-3">
//                     <label for="exampleFormControlInput1" class="form-label">Заголовок</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={this.state.title}
//                         onChange={this.handleChange}
//                         className="form-control"
//                         id="exampleFormControlInput1"
//                         placeholder="Заголовок"/>
//                 </div>
//                 <div className="mb-3">
//                     <label for="exampleFormControlTextarea1" className="form-label">Текст</label>
//                     <textarea
//                         className="form-control"
//                         name="text"
//                         value={this.state.text}
//                         onChange={this.handleChange}
//                         id="exampleFormControlTextarea1"
//                         rows="3"></textarea>
//                 </div>
//                 <button type="submit" className="btn btn-primary mb-3">Добавить</button>
//             </form>
//             <hr/>
//             <div>
//                 {this.renderPosts()}
//             </div>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    // загружаем существующие посты при монтировании компонента
    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(posts => setPosts(posts))
            .catch(error => console.error(error));
    }, []);

    // обработчик изменения поля заголовка
    const handleTitleChange = event => setTitle(event.target.value);

    // обработчик изменения поля текста
    const handleTextChange = event => setText(event.target.value);

    // обработчик отправки формы
    const handleSubmit = event => {
        event.preventDefault();
        fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, text })
        })
            .then(res => res.json())
            .then(post => {
                setPosts([...posts, post]);
                setTitle('');
                setText('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Список постов</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <h2>Добавить новый пост</h2>
                <div>
                    <label htmlFor="title">Заголовок:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="text">Текст:</label>
                    <textarea id="text" value={text} onChange={handleTextChange} />
                </div>
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default PostList;