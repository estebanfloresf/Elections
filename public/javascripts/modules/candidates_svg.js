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
    height = 20 - margin.top - margin.bottom;


var m_div = d3.select("."+candidate[0].president+'"');

var svg = m_div.append("svg"),
    margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;



console.log(width);

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


x.domain([0, d3.max(candidate, function(d) {

    return d.percentage+10;
})]);
y.domain(candidate.map(function(d) {

    return d.president;
})).padding(0.25);

g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));




g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y))
    .style("text-transform", "text-capitalize");

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
            .style("text-transform", "text-capitalize")
            .html((d.president) + "<br>"  + (d.percentage)+ "%");
    })
    .on("mouseout", function(d){ tooltip.style("display", "none");});


