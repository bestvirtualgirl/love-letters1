

//  Define schema

const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    recipient: { type: String, required: true },
    design: { type: String, required: true } ,
    // createdAt: { type: Date, default: Date.now }
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;

// const letterSchema =  new mongoose.Schema({

//     sender: String,
//     recipient: String,
//     message: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now}

// });
