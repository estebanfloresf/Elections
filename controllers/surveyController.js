/**
 * Created by esteban on 13/7/17.
 */

const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');


exports.getSurveys = async (req,res)=>{


    const surveys = await Survey.find();

    const results = await Results.getTopProvinces('596bde9557cfe2310e8fb15a');



    res.json(results);

    // res.render('surveys', {title:"Surveys", surveys});

};


