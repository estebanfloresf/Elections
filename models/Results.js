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

//This returns the  nationwide results total
resultsSchema.statics.getNationResults = function () {
    return this.aggregate([{
            $group: {
                _id: "$round",
                totalmen: {
                    $sum: '$men'
                },
                totalwomen: {
                    $sum: '$women'
                }
            }
        },
        {
            $project: {
                _id: "$_id",
                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {
                    "$add": ["$totalmen", "$totalwomen"]
                }

            }
        }
    ])
};

//This returns the all the results of an specific candidate
resultsSchema.statics.getCandidateResults = function (id) {


    return this.aggregate([{
            $match: {
                candidate: id
            }
        },
        {
            $group: {
                _id: '$candidate',
                totalmen: {
                    $sum: '$men'
                },
                totalwomen: {
                    $sum: '$women'
                },


            }
        },

        {
            $project: {

                _id: '$_id',

                // totalmen: '$totalmen',
                // totalwomen: '$totalwomen',
                total: {
                    "$add": ["$totalmen", "$totalwomen"]
                }
            }
        }
    ]);
};

//This returns the top 5 results of an specific candidate
resultsSchema.statics.getTopProvinces = function (id) {

    return this.find({
            candidate: id
        })
        .sort({
            'men': -1
        })
        .limit(5)
        .select('candidate province men women -_id')
        .populate(' province ', ' name -_id');

};

//This returns the all the results of an specific province
resultsSchema.statics.getProvinceResults = function (id) {

    return this.aggregate([


        {
            $match: {
                province: id
            }
        },
        {
            $project: {
                totalmen: {
                    "$sum": "$men"
                },
                totalwomen: {
                    "$sum": "$women"
                },

                candidate: '$candidate',


            }
        },

        {
            $project: {

                candidate: '$candidate',

                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {
                    "$add": ["$totalmen", "$totalwomen"]
                }
            }
        }


    ]);





};




module.exports = mongoose.model('Results', resultsSchema);