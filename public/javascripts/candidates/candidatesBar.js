last = candidate[0].president.split(' ').slice(-1).join(' ');


// var formatPercent = d3.format(",.2%");
var p = Math.max(0, d3.precisionFixed(0.05));
var formatPercent = d3.format("." + p + "%");


var svg = d3.select("#bar-" + last).append('svg:svg'),
    margin = {top: 5, right: 10, bottom: 6, left: 6},
    width = +300 - margin.left - margin.right - 20,
    height = +80 - margin.top - margin.bottom - 20;


var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data = candidate;

data.sort(function (a, b) {
    return b.percentage - a.percentage;
});

x.domain([0, d3.max(data, function (d) {
    return 1;
})]);
y.domain(data.map(function (d) {

    // return d.president;
})).padding(0.1);

g.append("g")
    .attr("class", "x axis")
    // .style("font-size", ".6em")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(10).tickFormat(function (d) {
        return (d * 100) + "%";
    }).tickSizeInner([0.1]));


g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));


g.selectAll(".background-bar")
    .data(data)
    .enter()
    .append("rect")
        .attr("class", "background-bar")
        .attr("y", function (d) {

            return y(d.candidate);
        })
        .attr("width", function (d) {
            return x(1 - d.percentage);
        })
        .attr("x", function (d) {
            return x(d.percentage);
        })
        .attr("height", y.bandwidth())
    .append("text")
        .text(function (d) {

            return d.percentage;
        })
        .attr("class", "bartext")

        .attr("x", function (d) {

            return x(d.percentage); // +5
        })
        .attr("y", function (d) {

            return y(d.candidate);
        })
        // .attr("dy", "35em") //vertical align middle
        // .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "blue")
        .attr("text-anchor", "end");

var pattern = g.append("pattern")
    .attrs({id: "hash4_4", width: "8", height: "2", patternUnits: "userSpaceOnUse", patternTransform: "rotate(0)"})
    .append("rect")

    .attrs({width: "4", height: "8", transform: "translate(0,0)", id: "pattern"});

var graph = g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("height", y.bandwidth())

    .attr("y", function (d) {

        return y(d.candidate);
    })
    .attr("width", function (d) {
        return x(d.percentage);
    })
    .attr("rx", 2)
    .attr("ry", 2)
    .style("fill", "url(#hash4_4)");


// .append("text")
// .attr("class", "label")
//
// // .attr("x", 0)
// .attr("y", function(d) {
//     return y(d.president);
// })
// .attr("dy", ".35em")
// // .attr("font-size", "5px")
// // .attr("fill", "white")
// // .attr("text-anchor", "middle")
// .text(function(d){
//
//     return d.percentage;
// });


graph.transition()
    .duration(100)
    .delay(function (d, i) {
        return i * 23;
    });

graph.on("mousemove", function (d) {

    tooltip

        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .style("text-transform", "capitalize")
        .html((d.president) + "<br>" + formatPercent(d.percentage));
})
    .on("mouseout", function (d) {
        tooltip.style("display", "none");
    });








