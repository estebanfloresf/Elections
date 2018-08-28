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



    const finalArray = [];

    for(var i=0; i<candidates.length; i++){

         const temp = await  Results.getCandidateResults(candidates[i]._id);



         if(temp[0]) {
             const percent =(temp[0].total / totalNation[0].total).toFixed(4);
             finalArray.push({
                 president: candidates[i].president,
                 percentage: parseFloat(percent),

             });
         }


    }

    finalArray.push({
        president: "nulos",
        percentage: 0,
        // series: "cne" //needed for the d3 Chart
    });
    finalArray.push({
        president: "blancos",
        percentage: 0,
        // series: "cne" //needed for the d3 Chart
    });


    res.render('surveys', {title:"Surveys", surveys,  candidates, finalArray});

};


