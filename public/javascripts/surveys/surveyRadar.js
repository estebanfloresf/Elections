var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

var data = [];

var newArray = [];
survey[0].candidates.forEach(function (candidate) {

    var president = candidate.candidate.president;
    var percentage = candidate.percentage;

    var newObject = {president, percentage};

    newArray.push(newObject);


});
data.push(newArray);

console.log(candidates);

