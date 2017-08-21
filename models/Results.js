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


}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});


resultsSchema.statics.getNationResults = function () {
    return this.aggregate([
        {
            $group: {
                _id: "$round",
                totalmen: {$sum: '$men'},
                totalwomen: {$sum: '$women'}
            }
        },
        {
            $project: {
                _id: "$_id",
                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {"$add": ["$totalmen", "$totalwomen"]}

            }
        }
    ])
};

resultsSchema.statics.getCandidateResults = function (id) {


    return this.aggregate([
        {
            $group: {
                _id: id,
                totalmen: {$sum: '$men'},
                totalwomen: {$sum: '$women'}

            }
        },

        {
            $project: {
                _id: '$_id',
                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {"$add": ["$totalmen", "$totalwomen"]}
            }
        }
    ]);
};


resultsSchema.statics.getTopProvinces = function (id) {

    return this.find({candidate: id})
        .sort({'men': -1})
        .limit(5)
        .select('candidate province men women -_id')
        .populate(' province ', ' name -_id')

        ;

};

module.exports = mongoose.model('Results', resultsSchema);