const express = require("express")
const config = require("config")
const mongoose = require("mongoose");

const app = express()
const PORT = config.get("port")
const authRouter = require('./authRouter')
const Post = require('./models/Post')
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json())

app.use("/auth", authRouter)
app.get('/api/posts', (req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(error => res.status(500).send(error));
});

// создаем новый пост
app.post('/api/posts', (req, res) => {
    const post = new Post({title:req.body.title,text:req.body.text});
    post.save()
        .then(post => res.json(post))
        .catch(error => res.status(500).send(error));
});
app.delete('/api/posts', (req, res) => {
    const post =  Post.deleteOne({title:req.body.title,text:req.body.text});
    post.de()
        .then(post => res.json(post))
        .catch(error => res.status(500).send(error));
});
app.get("/api/posts/:title", function (req, res) {
    Post.findOne({title: req.params["title"]})
        .then(post => res.json(post))
        .catch(error => res.status(500).send(error));

});
async function startApp(){
    try {
        await mongoose.connect(config.get("mongooUri")).then((res)=> console.log("БД подключена")).catch((er) => {console.log("DB Error Occured:\n\tError description"+er);throw new Error()})

        app.listen(PORT,()=> console.log(`App has been started on ${PORT} `))
    }catch (e){
        console.log("Server Error",e.message)
        process.exit(1) //выходим из процесса node.js
    }
}
startApp()
