// var svg = d3.select("svg"),
//     margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;
// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([height, 0]);
// var g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var total = getTotal();



var percentage = ((candidate[0].total / total)*100).toFixed(2);


candidate[0]["percentage"] = percentage;



//set up svg using margin conventions - we'll need plenty of room on the left for labels
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

var x = d3.scaleLinear()
    .range([0, width]);




var mdiv = d3.select('div.'+candidate[0].president);



var svg = mdiv.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");




var tooltip = d3.select("body").append("div").attr("class", "toolTip");

// Scale the range of the data in the domains
x.domain([0, d3.max(candidate, function(d){

    return d.percentage;
})]);
y.domain(candidate.map(function(d) {

    return d.president;
}));
//y.domain([0, d3.max(data, function(d) { return d.percentage; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
    .data(candidate)
    .enter().append("rect")
    .attr("class", "bar")
    //.attr("x", function(d) { return x(d.percentage); })
    .attr("width", function(d) {
        console.log(d);
        return x(d.percentage); } )
    .attr("y", function(d) { return y(d.president); })
    .attr("height", y.bandwidth());



// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));


