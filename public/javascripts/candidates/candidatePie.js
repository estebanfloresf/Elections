var data = candidate;
var dataset = [
    {label: 'Abulia', count: 10},
    {label: 'Betelgeuse', count: 20},
    {label: 'Cantaloupe', count: 30},
    {label: 'Dijkstra', count: 40}
];

var width = 150;
var height = 150;
var radius = Math.min(width, height) / 2;
var donutWidth = 40;                            // NEW

var color = d3.scaleOrdinal(["#3581B8", "#F45B69"]);


var svg = d3.select("#pie-" + last)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);


var pie = d3.pie()
    .value(function (d) {
        return d.count;
    })
    .sort(null);

var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.label);
    });

path.append("text")
    .each(function(d) {
        var centroid = arc.centroid(d);
        d3.select(this)
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('dy', '0.33em')
            .style("color","#000")
            .text(

                d.data.label);
    });


