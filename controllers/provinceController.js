const mongoose = require('mongoose');
const Province = mongoose.model('Province');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');

exports.getProvinces = async (req,res) =>{

    const provinces = await Province.find({"path":{"$ne": ""}}).select('name path -_id');

    res.render('map',{title:'Map', provinces});

};


exports.provinceResults = async( req,res) =>{


    const candidates = await Candidate.find({}).select('president _id ');

    const provinces = await Province.find({}).select('-path -__v -flag');



    const selected = provinces.filter( e => e.name === req.body.province.trim());


    console.log(selected[0]._id);

    const results =  await  Results.getProvinceResults(selected[0]._id);

    console.log(results);

    if(selected){
        res.status(200).json( { info:selected });
    }
    else{
        res.status(200).json( { info:'' });
    }

    //
    // res.status(200).json( { title:req.body.province });
};

