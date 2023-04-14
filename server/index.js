const express = require("express")
const config = require("config")
const mongoose = require("mongoose");
const app = express()
const PORT = config.get("port")
const authRouter = require('./authRouter')

app.use(express.json())
app.use("/auth", authRouter)
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
