/**
 * Created by Esteban.Flores on 6/26/2017.
 */
const mongoose = require('mongoose');
const Candidate = mongoose.model('Candidate');


exports.editCandidate = (req,res) =>{
  res.render('editCandidate', {title:'Edit Candidate'});
};

exports.addCandidate = async (req,res) =>{
    // res.json(req.body);
    const candidate = await (new Candidate(req.body)).save();

    req.flash('success', `Succesfully created ${candidate.name}`);
    res.redirect('/');

};