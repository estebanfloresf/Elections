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


resultsSchema.statics.getTotalVoters = function () {
    return this.aggregate([
        {
            $group: {
                _id: "$round",
                totalmen: {$sum: '$men'},
                totalwomen: {$sum: '$women'}
            }
        },
        {
            $project:{
                _id: "$_id",
                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {"$add": ["$totalmen", "$totalwomen"]}

            }
        }
    ])
};


module.exports = mongoose.model('Results', resultsSchema);