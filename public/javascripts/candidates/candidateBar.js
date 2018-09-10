// var last = candidate[0].president.split(' ').slice(-1).join(' ');

import textures from 'textures';



function drawBar(candidate) {


  var p = Math.max(0, d3.precisionFixed(0.05));
  var formatPercent = d3.format("." + p + "%");
  var margin = {
      top: 20,
      bottom: 20,
      right: 10,
      left: 10
    },

    width = parseInt(d3.select(".barchart").style("width")) - margin.left - margin.right,
    height = parseInt(d3.select(".barchart").style("height")) - margin.bottom - margin.top;

  var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

  const texture =
    textures.lines()
    .size(4)
    .stroke("#c4e5f5")
    .strokeWidth(1)
    .background('#1d3557');

  var id = String(candidate._id).slice(-5);
  var svg = d3.select(`#bar-${id}`)
    .append('svg:svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  svg.call(texture);
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().range([height, 0]);
  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  x.domain([0, 1]);
  y.domain(candidate.president).padding(0.1);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height * .8) + ")")
    .call(d3.axisBottom(x).ticks(10).tickFormat(function (d) {
      return (d * 100) + "%";
    }).tickSizeInner([0.1]));



  g.selectAll(".background-bar")
    .data([candidate])
    .enter()
    .append("rect")
    .attr("class", "background-bar")
    .attr("y", function (d) {
      return y(d.president);
    })
    .attr("width", function (d) {

      return x(1 - parseInt(d.percentage, 0));
    })
    .attr("x", 0)
    .attr("height", (height * .8));


  g.selectAll(".bar")
    .data([candidate])
    .enter().append("rect")
    .attr("class", "bar")
    .style('fill', texture.url())
    .attr("x", 0)
    .attr("height", (height * .8))

    .attr("y", function (d) {
      return y(d.president);
    })
    .attr("width", function (d) {

      return x(d.percentage);
    });


  g.append("text")
    .data([candidate])
    .attr("class", "bartext")
    .attr("x", function (d) {
      return x(d.percentage) + 20;
    })
    .attr("y", (height / 2))
    .text(function (d) {
      return formatPercent(d.percentage);
    });

  g.transition()
    .duration(100)
    .delay(function (d, i) {
      return i * 23;
    });

  g
    .data([candidate])
    .on("mousemove", function (d) {
      if(d3.select(this).style("opacity") != 0){
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);		
      tooltip.html((d.president) + "<br>" + formatPercent(d.percentage))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      }
    })
    .on("mouseout", function () {
      tooltip.transition()   
        .duration(200)      
        .style("opacity", 0)
        .style("left", 0)
        .style("top", 0);
    }
    );
}

export function BarChart() {

  fetch('/api/candidates', {
      method: 'GET',

      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((data) => {

      data.candidates.map((candidate) => {
        // createBarChart(candidate);
        drawBar(candidate);
      });

    })
    .catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}