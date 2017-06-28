const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

const {catchErrors} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


// candidateController.editCandidate for edit
router.get('/candidates', catchErrors( candidateController.getCandidates ));
router.post('/addCandidate', catchErrors( candidateController.addCandidate));

module.exports = router;
