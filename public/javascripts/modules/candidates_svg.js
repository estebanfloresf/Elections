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
// g.append("text")
//     .attr("transform",
//         "translate(" + (width / 2) + " ," +
//         (height + margin.top + 12) + ")")
//     .style("text-anchor", "middle")
//     .style("font-size", ".6em")
//     .text("Fuente: CNE");


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

var pattern = g.append("pattern")
    .attrs({ id:"hash4_4", width:"8", height:"2", patternUnits:"userSpaceOnUse", patternTransform:"rotate(0)"})
    .append("rect")

    .attrs({ width:"4", height:"8", transform:"translate(0,0)",  id:"pattern" });

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



// Progress Circle SVG

var colors = {
    'pink': '#E1499A',
    'yellow': '#f0ff08',
    'green': '#47e495'
};

var color = colors.green;

var radius = 100;
var border = 5;
var padding = 5;
var startPercent = 0;
var endPercent = data[0].percentage;
console.log(data[0].percentage);

var twoPi = Math.PI * 2;
// var formatPercent = d3.format('.0%');
var boxSize = (radius + padding) * 2;


var count = Math.abs((endPercent - startPercent) / 0.01);
var step = endPercent < startPercent ? -0.01 : 0.01;

var arc = d3.arc()
    .startAngle(0)
    .innerRadius(radius)
    .outerRadius(radius - border);

var parent = d3.select("div.circle-" + last);

var svgcircle = parent.append('svg')
    .attr('width', boxSize)
    .attr('height', boxSize);

var defs = svgcircle.append('defs');

var filter = defs.append('filter')
    .attr('id', 'blur');

filter.append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', '7');

var gcircle = svgcircle.append('g')
    .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

var meter = gcircle.append('g')
    .attr('class', 'progress-meter');

meter.append('path')
    .attr('class', 'background')
    .attr('fill', '#ccc')
    .attr('fill-opacity', 0.5)
    .attr('d', arc.endAngle(twoPi));

var foreground = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1)
    .attr('stroke', color)
    .attr('stroke-width', 5)
    .attr('stroke-opacity', 1)
    .attr('filter', 'url(#blur)');

var front = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1);

var numberText = meter.append('text')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em');

function updateProgress(progress) {
    foreground.attr('d', arc.endAngle(twoPi * progress));
    front.attr('d', arc.endAngle(twoPi * progress));
    numberText.text(formatPercent(progress));
}

var progress = startPercent;

(function loops() {
    updateProgress(progress);

    if (count > 0) {
        count--;
        progress += step;
        setTimeout(loops, 10);
    }
})();





