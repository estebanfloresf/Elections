var lastName = candidate[0].president.split(' ').slice(-1).join(' ');
formatPercent = d3.format("." + p + "%");

women = candidate[0].totalwomen / candidate[0].total;
men = candidate[0].totalmen / candidate[0].total;






dataset = candidate[0].topProvinces;


dataset.sort(function (a, b) {
    if (a.percentage > b.percentage) {
        return -1;
    }
    if (a.percentage < b.percentage) {
        return 1;
    }
    // a must be equal to b
    return 0;
});


var width = 80,
    height = 80,
    outerRadius = Math.min(width, height) / 2,
    innerRadius = outerRadius * 0.5,
    // for animation
    innerRadiusFinal = outerRadius * .75,
    innerRadiusFinal3 = outerRadius * .65,
    // color = d3.scaleOrdinal(['#ff005b', '#3581B8']);   //builtin range of colors
    color = d3.scaleOrdinal(d3.schemeCategory10);


color.domain(dataset);



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
        return d.percentage;
    });

var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("svg:g")
    .attr("class", "slice-" + lastName)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", click)
;

arcs.append("svg:path")
    .attr("fill", function (d, i) {
        return color(i);
    })
    .attr("d", arc)
    .append("svg:title")
    .text(function (d) {
        return d.data.province + ": " + formatPercent(d.data.percentage);
    });

d3.selectAll("g.slice-" + lastName).selectAll("path").transition()
    .duration(750)
    .delay(10)
    .attr("d", arcFinal)
    .attr("id", function (d) {
        return lastName+'-'+(d.data.province).trim().replace(/ /g, '');
    })

;

arcs.filter(function (d) {
    return d.endAngle - d.startAngle > .2;
})


// Pie chart title
vis.append("svg:text")
    .attr("dy", "0.1em")
    .style("font-size", "10px")
    .style("font-weight", "bold")
    .style("fill", function (d) {
        return color(d.percentage);
    })
    .style("text-transform", "capitalize")
    .attr("text-anchor", "middle")

    .html(
        ((dataset[0].province) )
    )
    .attr("class", "title-" + lastName);

vis.append("svg:text")
    .attr("dy", "1.3em")
    .style("font-size", "10px")
    .style("font-weight", "bold")
    .style("fill", function (d, i) {
        return color(d.percentage);
    })
    .attr("text-anchor", "middle")

    .html(
        formatPercent(dataset[0].percentage)
    )
    .attr("class", "titleP-" + lastName);


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


function click(d) {


    var selectedLastName = d3.select(this).attr("class").split('-').slice(1, 2).join(' ');
    var colorShown = d3.select(".titleP-" + selectedLastName).attr('style').split(';').slice(2,3)[0];
    colorShown = colorShown.replace('fill:','').trim();

    var color = document.querySelector('#'+selectedLastName+'-'+d.data.province.trim().replace(/ /g, '')).getAttribute('fill');

    console.log(color);

    d3.select(".title-" + selectedLastName).remove();
    d3.select(".titleP-" + selectedLastName).remove();

    province = d.data.province;
    value = formatPercent(d.data.percentage);

    // Pie chart title
    d3.select(this).append("svg:text")
        .attr("dy", "0.1em")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("text-transform", "capitalize")
        .style("fill", color)
        .attr("text-anchor", "middle")
        .text(province)
        .attr("class", "title-" + selectedLastName);

    d3.select(this).append("svg:text")
        .attr("dy", "1.3em")
        .style("font-size", "10px")
        .style("font-weight", "bold")

        .style("fill", color)
        .attr("text-anchor", "middle")
        .text(value)
        .attr("class", "titleP-" + selectedLastName);




}

