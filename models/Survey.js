/**
 * Created by Esteban.Flores on 6/21/2017.
 */
'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');


const firmSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Please enter a polling firm name!'
    },
    ranking: {
        type: Number,
        min: 1,
        max: 5,
        required: 'Please enter a rating'
    },
    firstpoll: [{
        date: Date,
        margin: Number,
        cities: [String],
        candidates: [{


            candidate: {
                type: mongoose.Schema.ObjectId,
                ref: 'Candidate',
                percentage: Number,
                required: 'You must supply a candidate'
            }


        }]

    }],
    secondPoll: [{
        date: Date,
        margin: Number,
        cities: [String],
        candidates: [{

            percentage: Number,
            candidate: {
                type: mongoose.Schema.ObjectId,
                ref: 'Candidate'
            },
            required: 'You must supply a candidate'

        }]

    }]

});

module.exports = mongoose.model('Survey', firmSchema);