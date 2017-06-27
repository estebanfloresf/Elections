'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const candidateSchema = new mongoose.Schema({

    name :{
        type: String,
        lowercase:true,
        required: 'Candidate must have a name'
    },
    lastname :{
        type: String,
        lowercase:true,
        required: 'Candidate must have a last name'
    },
    polorg :{
        type: String,
        lowercase:true,
        required: 'Candidate must have an organization'
    },


    photo : String



});


module.exports = mongoose.model('Candidate', candidateSchema);