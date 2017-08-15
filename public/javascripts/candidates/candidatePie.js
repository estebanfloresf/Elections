var lastName = candidate[0].president.split(' ').slice(-1).join(' ');
var formatPercent = d3.format("." + p + "%");

var women = candidate[0].totalwomen / candidate[0].total;
var men = candidate[0].totalmen / candidate[0].total;



var pieInnerText = formatPercent(men);
var pieInnerStyle = "#3581B8";


var dataset = [
    {category: "women", measure: women},
    {category: "men", measure: men},

];

var width = 70,
    height = 70,
    outerRadius = Math.min(width, height) / 2,
    innerRadius = outerRadius * 0.9,
    // for animation
    innerRadiusFinal = outerRadius * .65,
    innerRadiusFinal3 = outerRadius * .45,
    color = d3.scaleOrdinal(['#ff005b', '#3581B8']);   //builtin range of colors


var vis = d3.select("#pie-" + last)
    .append("svg:svg")
    .data([dataset])
    .attr("class", "pie-" + lastName)
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
    .attr("class", "slice-"+lastName)
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

d3.selectAll("g.slice-"+lastName).selectAll("path").transition()
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


// Pie chart title
vis.append("svg:text")
    .attr("dy", "0.3em")
    .style("font-size","10px")
    .style("font-weight","bold")
    .style("fill", pieInnerStyle)
    .attr("text-anchor", "middle")
    .text(function () {

        return pieInnerText;
    })
    .attr("class", "title-"+lastName);


function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
}


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




        var selectedLastName = d3.select(this).attr("class").split('-').slice(1,2).join(' ');
       


        d3.select(".title-" + selectedLastName).remove();
        pieInnerText = formatPercent(d.data.measure);

        if (d.data.category === 'men') {
            pieInnerStyle = '#3581B8';
        }
        else {
            pieInnerStyle = '#ff005b';
        }






// Pie chart title
    d3.select(this).append("svg:text")
        .attr("dy", "0.3em")
        .style("font-size","10px")
        .style("font-weight","bold")
        .style("fill", pieInnerStyle)
        .attr("text-anchor", "middle")
        .text(function () {

            return pieInnerText;
        })
        .attr("class", "title-"+selectedLastName);
}

