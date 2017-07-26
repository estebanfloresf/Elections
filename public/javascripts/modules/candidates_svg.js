var total = getTotal();


var percentage = ((candidate[0].total / total) ).toFixed(4  );



candidate[0]["percentage"] = percentage;


// var div = d3.select("div."+candidate[0].president)
//     .append("svg")
//     .attr('width',400)
//     .attr('height',100);

last = candidate[0].president.split(' ').slice(-1).join(' ');


// var formatPercent = d3.format(",.2%");
var p = Math.max(0, d3.precisionFixed(0.05) );
var formatPercent = d3.format("." + p + "%");

var svg = d3.select("svg." + last),
    margin = {top: 5, right: 10, bottom: 6, left: 6},
    width = +svg.attr("width") - margin.left - margin.right -20,
    height = +svg.attr("height") - margin.top - margin.bottom -20;


var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data = candidate;

data.sort(function (a, b) {
    return a.percentage - b.percentage;
});

x.domain([0, d3.max(data, function (d) {
    return 1;
})]);
y.domain(data.map(function (d) {

    // return d.president;
})).padding(0.1);

g.append("g")
    .attr("class", "x axis")
    .style("font-size", ".6em")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(10).tickFormat(function (d) {
        return (d*100)+ "%";
    }).tickSizeInner([0.1]));

// text label for the x axis
g.append("text")
    .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 12) + ")")
    .style("text-anchor", "middle")
    .style("font-size", ".6em")
    .text("Fuente: CNE");


g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));


g.selectAll(".background-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "background-bar")
    .attr("y", function(d) { return y(d.percentage); })
    .attr("width", function (d) {
        return x(1-d.percentage);
    })
    .attr("x", function(d) { return x(d.percentage); })
    .attr("height", y.bandwidth());
    // .append("text")
    // .attr("class", "bartext")
    //
    // .attr("x", function(d) {
    //     return x(d.percentage); // +5
    // })
    // .attr("y", function(d) {
    //     return y(d.percentage);
    // })
    // // .attr("dy", "35em") //vertical align middle
    //
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "11px")
    // .attr("fill", "white")
    // .attr("text-anchor", "middle")
    // .text(function(d){
    //     return d.percentage;
    // });



var graph = g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("height", y.bandwidth())

    .attr("y", function (d) {
        return y(d.president);
    })
    .attr("width", function (d) {
        return x(d.percentage);
    })
    .attr("rx", 2)
    .attr("ry", 2);


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








