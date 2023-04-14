const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require("config");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/auth",require("./routes/auth.routes"))
mongoose.connect(config.get("mongooUri"))

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/reg', async (req, res) => {
    try {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if (existingUser) {
            res.status(400).json({message: 'Username already taken'});

            return;
        }

        const newUser = new User({username, password});
        await newUser.save();

        res.json({message: 'User successfully registered'});
    }
    catch (e){
        console.log(e.message)
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
