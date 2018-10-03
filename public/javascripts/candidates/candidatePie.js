

function drawPieChart(candidate){
  
  var id = String(candidate._id).slice(-5);
  var p = Math.max(0, d3.precisionFixed(0.05));
  var formatPercent = d3.format("." + p + "%");

  var women = candidate.totalwomen / candidate.total;
  var men = candidate.totalmen / candidate.total;

  var dataset = candidate.topProvinces;

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
    color = d3.scaleOrdinal(['#ff005b', '#92aab6', '#1D3557', '#FFC531', '#3581B8']); //builtin range of colors
  // color = d3.scaleOrdinal(d3.scheme);
  color.domain(dataset);  
  var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

  var vis = d3.select("#pie-" + id)
    .append("svg:svg")
    .data([dataset])
    .attr("class", "pie-" + id)
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
  
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
    .attr("class", "slice-" + id)
    .on("mouseover", function (d) {
    
      d3.select(this).select("path").transition()
        .duration(0.2)
        .attr("d", arcFinal3);

        if(d3.select(this).style("opacity") != 0){
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);		
          tooltip.html((d.data.province) + "<br>" + formatPercent(d.data.percentage))
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px");
          }
    })
    .on("mouseout", mouseout)
    .on("click", function(d){
        
        click(d);
    });
  
  arcs.append("svg:path")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", arc);
  
  d3.selectAll("g.slice-" + id).selectAll("path").transition()
    .duration(750)
    .delay(10)
    .attr("d", arcFinal)
    .attr("id", function (d) {
      return id + '-' + (d.data.province).trim().replace(/ /g, '');
    })
  
  ;
  
  arcs.filter(function (d) {
    return d.endAngle - d.startAngle > .2;
  })
  
  
  // Pie chart Province - Initial State
  vis.append("svg:text")
    .attr("dy", "-0.6em")
    .style("font-size", "10px")
    .style("font-weight", "bold")
    .style("fill", function (d) {
      return color(0);
    })
    .style("text-transform", "capitalize")
    .attr("text-anchor", "middle")
  
    .text(
      ((dataset[0].province))
    )
    .attr("class", "title-" + id);
  
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
    .attr("class", "perc-" + id);

  function mouseout() {

    tooltip.transition()   
    .duration(200)      
    .style("opacity", 0)
    .style("left", 0)
    .style("top", 0);

    d3.select(this).select("path").transition()
      .duration(0.2)
      .attr("d", arcFinal);

  }

  function click(d) {
    const {province,percentage} = d.data; 
    var colorID = d3.select(`#${id}-${province.replace(/ +/g, "").trim()}`).attr('fill');
    
    d3.select(`.title-${id}`)
      .style('fill',colorID)  
      .text(province)
      .call(wrap, 55);
    d3.select(`.perc-${id}`)
      .style('fill',colorID)
      .text(formatPercent(percentage));
  }
  function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dx = 0, //parseFloat(text.attr("dy")),
            dy = -0.6; //parseFloat(text.attr("dy")),sdfsd
            
            var tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        // .attr("dx", 1.0 + "em")
                        .attr("dy", dy + "em");
        
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
        
          
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dx", -2.6+ "em")
                            .attr("dy", (dy+1.5) + "em")
                            .text(word);
            }
        }
    });
}
}

export function PieChart() {
  
  fetch('/api/candidates', {
      method: 'GET',

      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((data) => {
        
        data.candidates.map((candidate)=>{
          drawPieChart(candidate);
        });
    })
    .catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}