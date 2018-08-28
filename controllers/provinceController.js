const mongoose = require('mongoose');
const Province = mongoose.model('Province');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');

exports.getProvinces = async (req, res) => {

    const provinces = await Province.find({
        "path": {
            "$ne": ""
        }
    }).select('name path -_id');

    const candidates = await Candidate.find({}).select('president _id ');

    res.render('map', {
        title: 'Map',
        provinces,
        candidates
    });

};


exports.provinceResults = async (req, res) => {


    const candidates = await Candidate.find({}).select('president _id');


    const province = await Province.findOne({
        name: req.body.province.trim()
    }).select('-path -__v');


    const results = await Results.getProvinceResults(province._id);

    // .exec(function (err, data) {

    //     if (err) {
    //         console.log(err);
    //     }

    //     //function to map for each aggregate candidate also the name (populate)


    //     data.forEach(function (e) {


    //         const presidentName = candidates.filter(candidate => candidate._id.toString() === e.candidate.toString());

    //         e['president'] = presidentName[0].president;


    //     });


    // });

    if (results) {
        res.status(200).json({
            results,
            province
        });
    } else {

        req.flashes('warning', 'Whoops we could not retrieve any information');
    }


};