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
    color = d3.scaleOrdinal(['#ff005b','#92aab6' ,'#1D3557','#FFC531','#3581B8']);   //builtin range of colors
    // color = d3.scaleOrdinal(d3.scheme);


color.domain(dataset);

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

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
    .on("mouseover", function (d) {

        d3.select(this).select("path").transition()
            .duration(0.2)
            .attr("d", arcFinal3);

        tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .style("text-transform", "capitalize")
            .html((d.data.province) + "<br>" + formatPercent(d.data.percentage));
    })
    .on("mouseout", mouseout)
    .on("click", click)
;

arcs.append("svg:path")
    .attr("fill", function (d, i) {
        return color(i);
    })
    .attr("d", arc) ;

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


// Pie chart Province - Initial State
vis.append("svg:text")
    .attr("dy", "0.1em")
    .style("font-size", "10px")
    .style("font-weight", "bold")
    .style("fill", function (d) {
        return color(0);
    })
    .style("text-transform", "capitalize")
    .attr("text-anchor", "middle")

    .text(
        ((dataset[0].province) )
    )
    .attr("class", "title-" + lastName);

// Pie chart Province Percentage - Initial State
vis.append("svg:text")
    .attr("dy", "1.3em")
    .style("font-size", "10px")
    .style("font-weight", "bold")
    .style("fill", function (d, i) {
        return color(0);
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
        .attr("d", arcFinal3);


}

function mouseout() {
    d3.select(this).select("path").transition()
        .duration(0.2)
        //.attr("stroke","blue")
        //.attr("stroke-width", 1.5)
        .attr("d", arcFinal);

    tooltip.style("display", "none");
}


function click(d) {

    var selectedLastName = d3.select(this).attr("class").split('-').slice(1, 2).join(' ');
    var colorShown = d3.select(".titleP-" + selectedLastName).attr('style').split(';').slice(2,3)[0];
    colorShown = colorShown.replace('fill:','').trim();

    var color = document.querySelector('#'+selectedLastName+'-'+d.data.province.trim().replace(/ /g, '')).getAttribute('fill');



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

