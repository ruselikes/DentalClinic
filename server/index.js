
const UslugiController = require("./Controllers/UslugiController")
const express = require("express")
const config = require("config")
const mongoose = require("mongoose");
const authMW = require('./middlewares/authMW')
const roleMW = require('./middlewares/roleMW')
const app = express()
const PORT = config.get("port")
const authRouter = require('./Router/authRouter')
const Post = require('./models/Post')
const Usluga = require('./models/Usluga')
const cors = require('cors');
const {check} = require("express-validator");
const authController = require("./Controllers/authController");
const adminRouter = require("./Router/adminRouter")
const appointmentRouter = require("./Router/appointmentRouter")
const stuffRouter = require("./Router/stuffRouter")
const doctorRouter = require("./Router/doctorRouter")

app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json())

app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/priem", appointmentRouter)
app.use("/doctor", doctorRouter)
app.use("/staff", stuffRouter)

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
//удаляем пост
app.delete('/api/posts', (req, res) => {
    const post =  Post.deleteOne({title:req.body.title,text:req.body.text});
    post.deleteOne()
        .then(post => res.json(post))
        .catch(error => res.status(500).send(error));
});
app.get("/api/posts/:title", function (req, res) {
    Post.findOne({title: req.params["title"]})
        .then(post => res.json(post))
        .catch(error => res.status(500).send(error));

});
//--------------------Услуги клиники------------------
app.get("/prices", UslugiController.getPrices);
app.get("/prices/:id",UslugiController.getPriceById)
app.post('/prices',roleMW(["admin"]), UslugiController.addPrice);
app.delete("/prices/:id", roleMW(["admin"]),UslugiController.deletePrice)

async function startApp(){
    try {
        await mongoose.connect(config.get("mongoCompas")).then((res)=> console.log("БД подключена")).catch((er) => {console.log("DB Error Occured:\n\tError description"+er);throw new Error()})

        app.listen(PORT,()=> console.log(`App has been started on ${PORT} `))
    }catch (e){
        console.log("Server Error",e.message)
        process.exit(1) //выходим из процесса node.js
    }
}
startApp()
