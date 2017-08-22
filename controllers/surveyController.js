/**
 * Created by esteban on 13/7/17.
 */

const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');


exports.getSurveys = async (req,res)=>{


    const surveys = await Survey.find().populate('firm candidates.candidate','name slug  president id   -_id');


    const candidates = await Candidate.find({});


    res.render('surveys', {title:"Surveys", surveys,  candidates});

};


