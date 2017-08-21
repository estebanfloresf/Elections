/**
 * Created by Esteban.Flores on 6/26/2017.
 */
const mongoose = require('mongoose');
const Candidate = mongoose.model('Candidate');
const Results = mongoose.model('Results');
const Province = mongoose.model('Province');

exports.getCandidates = async (req, res) =>{

   //Order the candidates by their total votes
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


    const candidates =  await Candidate.getNationResults();




    // 1) Loop throught the array of candidates
    // 2) get the top provinces votes from each provinceand save it into an array
    //3) save that array as part of the candidate value

    for(let i=0; i<candidates.length; i++){



            //
            // .limit(5);

        const topProvinces = await Results
            .find({'candidate': candidates[i]._id})
            .sort({'total': -1})
            .limit(5)
            .select('candidate province men women -_id')

            .populate('candidate province ', 'president name -_id')
            ;




        console.log(topProvinces);

        var totalPercentage = 0;

        topProvinces.forEach(function (elem) {

            totalPercentage += elem.total;

        });




        candidates[i]['topProvinces'] = [];
        topProvinces.forEach(function (elem) {



            candidates[i]['topProvinces'].push({
                province : elem.province.name,
                percentage: (elem.total / totalPercentage).toFixed(4)
            });
        });







    }


    candidates.sort(order);

    candidates.forEach(function (candidate) {


        candidate["percentage"] = ((candidate["total"] / totalvotes[0].total) ).toFixed(4);
        candidate["menPerc"] = ((candidate["totalmen"] / candidate['total']) ).toFixed(4);
        candidate["womenPerc"] = ((candidate["totalwomen"] / candidate['total']) ).toFixed(4);


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