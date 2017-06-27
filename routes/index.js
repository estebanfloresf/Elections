const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/candidates', candidateController.editCandidate );
router.post('/addCandidate', candidateController.addCandidate);

module.exports = router;
