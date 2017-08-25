/**
 * Created by esteban on 13/7/17.
 */

const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const Results = mongoose.model('Results');
const Candidate = mongoose.model('Candidate');


exports.getSurveys = async (req,res)=>{


    const surveys = await Survey.find().populate('firm candidates.candidate','name slug  president id   -_id');


    const candidates = await Candidate.find({}).select('_id president');


    const totalNation = await Results.getNationResults();

    // console.log(totalNation);

    const finalArray = [];

    for(var i=0; i<candidates.length; i++){

         const temp = await  Results.getCandidateResults(candidates[i]._id);

         console.log(temp);
         // console.log(totalNation[0].total);

         // console.log(candidates[i].president);

    }


    res.render('surveys', {title:"Surveys", surveys,  candidates});

};


