/**
 * Created by esteban on 13/7/17.
 */

const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');


exports.getSurveys = async (req,res)=>{

    const surveys =  await Survey.find();

    res.render('surveys', {title:"Surveys", surveys});

};


