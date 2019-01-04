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
<<<<<<< HEAD
    return this.aggregate([
        {
            $group: {
                _id: "$round",
                totalmen: {$sum: '$men'},
                totalwomen: {$sum: '$women'}
=======
    return this.aggregate([{
            $group: {
                _id: "$round",
                totalmen: {
                    $sum: '$men'
                },
                totalwomen: {
                    $sum: '$women'
                }
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
            }
        },
        {
            $project: {
                _id: "$_id",
                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
<<<<<<< HEAD
                total: {"$add": ["$totalmen", "$totalwomen"]}
=======
                total: {
                    "$add": ["$totalmen", "$totalwomen"]
                }
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5

            }
        }
    ])
};

//This returns the all the results of an specific candidate
resultsSchema.statics.getCandidateResults = function (id) {


<<<<<<< HEAD
    return this.aggregate([
        {
=======
    return this.aggregate([{
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
            $match: {
                candidate: id
            }
        },
        {
            $group: {
                _id: '$candidate',
<<<<<<< HEAD
                totalmen: {$sum: '$men'},
                totalwomen: {$sum: '$women'},
=======
                totalmen: {
                    $sum: '$men'
                },
                totalwomen: {
                    $sum: '$women'
                },
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5


            }
        },

        {
            $project: {

                _id: '$_id',

                // totalmen: '$totalmen',
                // totalwomen: '$totalwomen',
<<<<<<< HEAD
                total: {"$add": ["$totalmen", "$totalwomen"]}
=======
                total: {
                    "$add": ["$totalmen", "$totalwomen"]
                }
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
            }
        }
    ]);
};

//This returns the top 5 results of an specific candidate
resultsSchema.statics.getTopProvinces = function (id) {

<<<<<<< HEAD
    return this.find({candidate: id})
        .sort({'men': -1})
        .limit(5)
        .select('candidate province men women -_id')
        .populate(' province ', ' name -_id')
        ;
=======
    return this.find({
            candidate: id
        })
        .sort({
            'men': -1
        })
        .limit(5)
        .select('candidate province men women -_id')
        .populate(' province ', ' name -_id');
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5

};

//This returns the all the results of an specific province
resultsSchema.statics.getProvinceResults = function (id) {

    return this.aggregate([


        {
<<<<<<< HEAD
            $match: {province: id}
        },
        {
          $project:{
              totalmen : {"$sum":"$men"},
              totalwomen : {"$sum":"$women"},

              candidate : '$candidate',


          }
=======
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
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
        },

        {
            $project: {

<<<<<<< HEAD
                candidate : '$candidate',

                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {"$add": ["$totalmen", "$totalwomen"]}
=======
                candidate: '$candidate',

                totalmen: '$totalmen',
                totalwomen: '$totalwomen',
                total: {
                    "$add": ["$totalmen", "$totalwomen"]
                }
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
            }
        }


    ]);





};




module.exports = mongoose.model('Results', resultsSchema);