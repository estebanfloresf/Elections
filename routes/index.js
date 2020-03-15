const express = require("express");
const router = express.Router();
// const candidateController = require("../controllers/candidateController");
// const surveyController = require("../controllers/surveyController");
// const provinceController = require("../controllers/provinceController");

// const { catchErrors } = require("../handlers/errorHandlers");

/* GET home page. */
router.get("/home", function(req, res, next) {
  res.send({ message: "home" });
  next();
});

// candidateController
// router.get("/candidates", catchErrors(candidateController.getCandidates));
// router.get(
//   "/api/candidates",
//   catchErrors(candidateController.getCandidatesInfo)
// );

// router.get("/surveys", catchErrors(surveyController.getSurveys));
// renders map view
// router.get("/map", function(req, res, next) {
//   res.render("map", {
//     title: "Map"
//   });
//   next();
// });
// returns map info
// router.get("/api/map", catchErrors(provinceController.getMapInfo));
// router.post("/provinceInfo", catchErrors(provinceController.provinceResults));
const controller = (req, res) => {
  res.send({ message: "hello" });
};
router
  .route("/")
  .get(controller)
  .post(controller);

router
  .route("/:id")
  .get(controller)
  .put(controller)
  .delete(controller);

module.exports = router;
