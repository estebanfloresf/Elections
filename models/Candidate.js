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
        required: 'Candidate must have a name'
    },
    polorg :{
        type: String,
        lowercase:true,
        required: 'Candidate must have an organization'
    },


    pre_photo : String



});


module.exports = mongoose.model('Candidate', candidateSchema);