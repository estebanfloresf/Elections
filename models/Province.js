/**
 * Created by Esteban.Flores on 7/14/2017.
 */

'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const provinceSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Please enter a province name!'
    },
    photo: String,
    flag: String
});

module.exports = mongoose.model('Province', provinceSchema);