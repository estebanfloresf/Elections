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
var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 60
};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


x.domain([0, d3.max(candidate, function(d) {

    return d.percentage;
})]);
y.domain(candidate.map(function(d) {

    return d.president;
})).padding(0.1);

g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

g.selectAll(".bar")
    .data(candidate)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("height", y.bandwidth())
    .attr("y", function(d) { return y(d.president); })
    .attr("width", function(d) { return x(d.percentage); })
    .on("mousemove", function(d){
        tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html((d.president) + "<br>" + "£" + (d.percentage));
    })
    .on("mouseout", function(d){ tooltip.style("display", "none");});


