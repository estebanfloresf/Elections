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
router.get('/api/candidates', catchErrors(candidateController.getCandidatesInfo));

router.post('/addCandidate', catchErrors(candidateController.addCandidate));
router.get('/surveys', catchErrors(surveyController.getSurveys));
// renders map view
router.get('/map', function (req, res, next) {
  res.render('map', {
    title: 'Map'
  })
});
// returns map info
router.get('/api/map', catchErrors(provinceController.getMapInfo));
router.post('/provinceInfo', catchErrors(provinceController.provinceResults));



module.exports = router;