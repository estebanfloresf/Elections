const mongoose = require('mongoose');
const Province = mongoose.model('Province');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');

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
