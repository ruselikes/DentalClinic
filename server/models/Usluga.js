const mongoose = require('mongoose');


const uslugaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const Usluga = mongoose.model('Usluga', uslugaSchema);

module.exports = Usluga;