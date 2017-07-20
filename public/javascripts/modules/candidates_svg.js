
var total = getTotal();



var percentage = ((candidate[0].total / total)*100).toFixed(2);


candidate[0]["percentage"] = percentage;


// var div = d3.select("div."+candidate[0].president)
//     .append("svg")
//     .attr('width',400)
//     .attr('height',100);

last = candidate[0].president.split(' ').slice(-1).join(' ');


var svg = d3.select("svg."+last),
    margin = {top: 20, right: 20, bottom: 10, left: 80},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;


var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data = candidate;

data.sort(function(a, b) { return a.percentage - b.percentage; });

x.domain([0, d3.max(data, function(d) { return 100; })]);
y.domain(data.map(function(d) { return d.president; })).padding(0.1);

g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(10).tickFormat(function(d) { return parseInt(d ); }).tickSizeInner([1]));

g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

g.selectAll(".bar")
    .data(data)
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
            .style("text-transform", "capitalize")
            .html((d.president) + "<br>"  + (d.percentage)+ "%");
    })
    .on("mouseout", function(d){ tooltip.style("display", "none");});









