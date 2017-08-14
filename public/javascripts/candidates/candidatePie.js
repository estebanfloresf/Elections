


var formatPercent = d3.format("." + p + "%");



var dataset = [
        {category: "Mujeres", measure: candidate[0].totalwomen / candidate[0].total},
        {category: "Hombres", measure: candidate[0].totalmen / candidate[0].total},

    ];

var width = 60,
    height = 60,
    outerRadius = Math.min(width, height) / 2,
    innerRadius = outerRadius * 0.9,
    // for animation
    innerRadiusFinal = outerRadius * .65,
    innerRadiusFinal3 = outerRadius * .45,
    color = d3.scaleOrdinal(['#FF5555','#3581B8']);   //builtin range of colors
;

var vis = d3.select("#pie-" + last)
    .append("svg:svg")
    .data([dataset])
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
;

var arc = d3.arc()
    .outerRadius(outerRadius).innerRadius(innerRadius);

// for animation
var arcFinal = d3.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
var arcFinal3 = d3.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

var pie = d3.pie()
    .value(function (d) {
        return d.measure;
    });

var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("svg:g")
    .attr("class", "slice")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", up)
;

arcs.append("svg:path")
    .attr("fill", function (d, i) {
        return color(i);
    })
    .attr("d", arc)
    .append("svg:title")
    .text(function (d) {
        return d.data.category + ": " + formatPercent(d.data.measure);
    });

d3.selectAll("g.slice").selectAll("path").transition()
    .duration(750)
    .delay(10)
    .attr("d", arcFinal)
;

arcs.filter(function (d) {
    return d.endAngle - d.startAngle > .2;
})
    .append("svg:text")
    // .attr("dy", ".2em")
    // .attr("text-anchor", "start")
    // .attr("class","pieText")
    // .attr("transform", function (d) {
    //     return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")";
    // })
    //
    // .text(function (d) {
    //     return d.data.category;
    // })
;

function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
}


var selected = "";
// Pie chart title
// vis.append("svg:text")
//     .attr("dy", ".35em")
//     .attr("text-anchor", "middle")
//     .text(function () {
//         console.log(selected);
//         return "s";
//     })
//     .attr("class", "title")
// ;


function mouseover() {
    d3.select(this).select("path").transition()
        .duration(0.2)
        // .attr("stroke","red")
        // .attr("stroke-width", 1.5)
        .attr("d", arcFinal3)
    ;
}

function mouseout() {
    d3.select(this).select("path").transition()
        .duration(0.2)
        //.attr("stroke","blue")
        //.attr("stroke-width", 1.5)
        .attr("d", arcFinal)
    ;
}

function up(d) {

    selected = ""
    selected = d.data.measure;

    console.log(d3.select(this.g));

    d3.select(this).append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function () {

            return selected;
        })
        .attr("class", "title")
    ;
    


}
