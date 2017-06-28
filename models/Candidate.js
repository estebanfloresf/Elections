'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const candidateSchema = new mongoose.Schema({

    president :{
        type: String,
        lowercase:true,
        required: 'There must be a president candidate'
    },
    vicepresident :{
        type: String,
        lowercase:true,
        required: 'There must be a vicepresident candidate'
    },
    polorg :{
        type: String,
        lowercase:true,
        required: 'Candidate must have an organization'
    },


    photo_president : String,
    photo_vicepresident : String



});


module.exports = mongoose.model('Candidate', candidateSchema);