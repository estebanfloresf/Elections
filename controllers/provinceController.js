const mongoose = require('mongoose');
const Province = mongoose.model('Province');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');

<<<<<<< HEAD
exports.getProvinces = async (req, res) => {
	const provinces = await Province.find({ path: { $ne: '' } }).select('name path -_id');

	const candidates = await Candidate.find({}).select('president _id ');

	res.render('map', { title: 'Map', provinces, candidates });
};

exports.provinceResults = async (req, res) => {
	const candidates = await Candidate.find({}).select('president _id ');
	const province = await Province.findOne({ name: req.body.province.trim() }).select('-path -__v');

	const results = await Results.getProvinceResults(province._id);

	if (results) {
		res.status(200).json({ results, province, candidates });
	} else {
		req.flashes('warning', 'Whoops we could not retrieve any information');
	}
};
=======
exports.getMapInfo = async (req, res) => {

    const provinces = await Province.find({
        "path": {
            "$ne": ""
        }
    }).select('name path -_id');

    const candidates = await Candidate.find({}).select('president _id ');

    res.status(200).json({

        provinces,
        candidates
    });

};


exports.provinceResults = async (req, res) => {

    const province = await Province.findOne({
        name: req.body.province.trim()
    }).select('-path -__v');
    const candidates = await Candidate.find({}).select('president _id ');

    const results = await Results.getProvinceResults(province._id);

    if (results) {
        res.status(200).json({
            results,
            province,
            candidates
        });
    } else {

        req.flashes('warning', 'Whoops we could not retrieve any information');
    }


};
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
