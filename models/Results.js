/**
 * Created by Esteban.Flores on 7/14/2017.
 */

'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const resultsSchema = new mongoose.Schema({

    province: {
        type: mongoose.Schema.ObjectId,
        ref: 'Province',
        required: 'You must supply a province'
    },

    candidate: {
        type: mongoose.Schema.ObjectId,
        ref: 'Candidate',
        required: 'You must supply a candidate'
    },
    round: Number,
    men: Number,
    women: Number


});

module.exports = mongoose.model('Results', resultsSchema);