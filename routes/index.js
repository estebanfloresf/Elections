const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const surveyController = require('../controllers/surveyController');
const provinceController = require('../controllers/provinceController');

const {
  catchErrors
} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});


// candidateController.editCandidate for edit
router.get('/candidates', catchErrors(candidateController.getCandidates));
router.post('/addCandidate', catchErrors(candidateController.addCandidate));
router.get('/surveys', catchErrors(surveyController.getSurveys));
router.get('/map', catchErrors(provinceController.getProvinces));
router.post('/provinceInfo', catchErrors(provinceController.provinceResults));


module.exports = router;