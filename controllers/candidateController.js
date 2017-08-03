/**
 * Created by Esteban.Flores on 6/26/2017.
 */
const mongoose = require('mongoose');
const Candidate = mongoose.model('Candidate');
const Results = mongoose.model('Results');

exports.getCandidates = async (req, res) =>{

    //1. Query the database for a list of candidates and their results, so I query on the results collection

    // const candidates = await Candidate.find();

    // const results = await Results.find({},{'round_one.candidate':1, 'round_two.candidate':1, 'provincia':1, 'round_one.total':1}).populate('round_one.candidate round_two.candidate ', 'president');

    function order(a,b) {


        if(a.total < b.total) {
            return -1;
        }
        if(a.total > b.total) {
            return 1;
        }
        return 0;
    }


    const totalvotes = await Results.getTotalVoters();
    // res.json(totalvotes[0].total);

    const candidates =  await Candidate.getNationResults();


    candidates.sort(order);

    candidates.forEach(function (candidate) {
        candidate["percentage"] = ((candidate["total"] / totalvotes[0].total) ).toFixed(4);


    });

    // res.json(candidates);

    res.render('candidates', {title: "Candidates",  candidates});

};


exports.editCandidate = (req,res) =>{
  res.render('editCandidate', {title:'Edit Candidate'});
};

exports.addCandidate = async (req,res) =>{
    // res.json(req.body);
    const candidate = await (new Candidate(req.body)).save();


    if (!candidate){
        req.flash('error','Whoops something went wrong');
    }

    req.flash('success', `Succesfully created ${candidate.name}`);
    res.redirect('/');

};