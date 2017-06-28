/**
 * Created by Esteban.Flores on 6/26/2017.
 */
const mongoose = require('mongoose');
const Candidate = mongoose.model('Candidate');

exports.getCandidates = async (req, res) =>{

    //1. Query the database for a list of stores

    const candidates = await Candidate.find();

    res.render('candidates', {title: "Candidates", candidates});

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