lastName = candidate[0].president.split(' ').slice(-1).join(' ').trim();



var svg = d3.select("#svgEmbed-"+lastName),
            width = +svg.attr("width"),
            height = +svg.attr("height");






var g = svg.append("g")
        .append("image")
        .attr("xlink:href","../images/misc/ecuador.svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class","map")
        .style("fill","red");

