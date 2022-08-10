const mongoose = require('mongoose'); //TODO:: ACTUALLY INSTALL MONGOOSE
//CONTINUE THIS VIDEO FROM `${16:00}`::=> https://www.youtube.com/watch?v=AHXFMu8xVsc&t=3s

const File = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    password: String,
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('file',File);