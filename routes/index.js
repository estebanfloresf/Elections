const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const surveyController = require('../controllers/surveyController');
const provinceController = require('../controllers/provinceController');

<<<<<<< HEAD
const {catchErrors} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
=======
const {
  catchErrors
} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home'
  });
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
});


// candidateController.editCandidate for edit
<<<<<<< HEAD
router.get('/candidates', catchErrors( candidateController.getCandidates ));
router.post('/addCandidate', catchErrors( candidateController.addCandidate));
router.get('/surveys', catchErrors( surveyController.getSurveys ));
router.get('/map', catchErrors(provinceController.getProvinces));
router.post('/provinceInfo',catchErrors(provinceController.provinceResults));


module.exports = router;
=======
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
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
