var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = Math.min(400, window.innerWidth - 10) - margin.left - margin.right,
  height = window.innerHeight - margin.top - margin.bottom - 70;

var data = [];

var newArray = [];
survey[0].candidates.forEach(function(candidate) {
  var president = candidate.candidate.president;
  var percentage = candidate.percentage;
  var series = survey[0].firm.slug.replace(".", "").trim();
  var series = survey[0].firm.slug.replace(".", "").trim();

  var newObject = {
    president,
    percentage,
    series
  };

  newArray.push(newObject);
});

candidates.forEach(function(candidate) {
  candidate["series"] = "cne";
});

data.push(newArray); //fill the data with the survey results
data.push(candidates); // fill the data with the cne results

var color = d3.scaleOrdinal(["#3581b8", "#EDC951"]);

var radarChartOptions = {
  w: width,
  h: height,
  margin: margin,
  maxValue: 0.4,
  levels: 5,
  roundStrokes: true,
  color: color,
  areaName: "series",
  axisName: "president",
  value: "percentage"
};
//Call function to draw the Radar chart

var id = "#radar-" + survey[0].firm.slug.replace(".", "").trim();

RadarChart(id, data, radarChartOptions);

function RadarChart(id, data, options) {
  var cfg = {
    w: 200, //Width of the circle
    h: 200, //Height of the circle
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }, //The margins of the SVG
    levels: 3, //How many levels or inner circles should there be drawn
    maxValue: 0, //What is the value that the biggest circle will represent
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scaleOrdinal(["#3581b8", "#EDC951"]), //Color function
    legendPosition: {
      x: 185,
      y: 20
    },
    areaName: "series",
    axisName: "axis",
    value: "percentage"
  };

  // /Put all of the options into a variable called cfg

  if ("undefined" !== typeof options) {
    for (var i in options) {
      if ("undefined" !== typeof options[i]) {
        cfg[i] = options[i];
      }
    } //for i
  } //if

  // Map the fields specified in the configuration to the axis and value variables
  var axisName = cfg["axisName"],
    areaName = cfg["areaName"],
    value = cfg["value"];

  // If the supplied maxValue is smaller than the actual one, replace by the max
  // in the data
  var maxValue = Math.max(
    cfg.maxValue,
    d3.max(data, function(i) {
      return d3.max(
        i.map(function(o) {
          return o.percentage;
        })
      );
    })
  );

  var allAxis = data[0].map(function(i, j) {
      return i.president;
    }), //Names of each axis
    total = allAxis.length, //The number of different axes
    radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
    formatPercent = d3.format(".2%"), //Percentage formatting
    angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  //Scale for the radius
  var rScale = d3
    .scaleLinear()
    .range([0, radius])
    .domain([0, maxValue]);

  // /////////////////////////////////////////////////////// ////////// Create the
  // container SVG and g /////////////
  // /////////////////////////////////////////////////////// Remove whatever chart
  // with the same id/class was present before
  d3.select(id)
    .select("svg")
    .remove();

  // Initiate the radar chart SVG
  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar" + id);
  //Append a g element
  var g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (cfg.w / 2 + cfg.margin.left) +
        "," +
        (cfg.h / 2 + cfg.margin.top) +
        ")"
    )
    .style("padding", "0.5em");

  // /////////////////////////////////////////////////////// //////// Glow filter
  // for some extra pizzazz ///////////
  // /////////////////////////////////////////////////////// Filter for the
  // outside glow
  var filter = g
      .append("defs")
      .append("filter")
      .attr("id", "glow"),
    feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur"),
    feMerge = filter.append("feMerge"),
    feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
    feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  // /////////////////////////////////////////////////////// ///////////// Draw
  // the Circular grid //////////////////
  // /////////////////////////////////////////////////////// Wrapper for the grid
  // & axes
  var axisGrid = g.append("g").attr("class", "axisWrapper");

  //Draw the background circles
  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", function(d, i) {
      return (radius / cfg.levels) * d;
    })
    .style("fill", "#f2f2f2")
    .style("stroke", "#CDCDCD")
    .style("fill-opacity", cfg.opacityCircles)
    .style("filter", "url(#glow)");

  //Text indicating at what % each level is
  axisGrid
    .selectAll(".axisLabel")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("text")
    .attr("class", "radar-axisLabel")
    .attr("x", 4)
    .attr("y", function(d) {
      return (-d * radius) / cfg.levels;
    })
    .attr("dy", "-0.6em")
    .text(function(d, i) {
      return formatPercent((maxValue * d) / cfg.levels);
    });

  // /////////////////////////////////////////////////////// //////////////////
  // Draw the axes //////////////////////
  // /////////////////////////////////////////////////////// Create the straight
  // lines radiating outward from the center
  var axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");
  //Append the lines
  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function(d, i) {
      return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("y2", function(d, i) {
      return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  //Append the labels at each axis
  axis
    .append("text")
    .attr("class", "legend")
    .style("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", function(d, i) {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.cos(angleSlice * i - Math.PI / 2)
      );
    })
    .attr("y", function(d, i) {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.sin(angleSlice * i - Math.PI / 2)
      );
    })
    .text(function(d) {
      return d;
    })
    .call(wrap, cfg.wrapWidth);

  // /////////////////////////////////////////////////////// /////////// Draw the
  // radar chart blobs ////////////////
  // /////////////////////////////////////////////////////// The radial line
  // function
  var radarLine = d3
    .lineRadial()
    .curve(d3.curveLinear)
    .radius(function(d) {
      return rScale(d.percentage);
    })
    .angle(function(d, i) {
      return i * angleSlice;
    });

  if (cfg.roundStrokes) {
    radarLine = d3
      .lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(function(d) {
        return rScale(d.percentage);
      })
      .angle(function(d, i) {
        return i * angleSlice;
      });
  }

  //Create a wrapper for the blobs
  var blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  //Append the backgrounds
  blobWrapper
    .append("path")
    .attr("class", function(d, i) {
      if (d[0].series === "cne")
        d[0].series = d[0].series + "-" + survey[0].firm.slug;

      return "radarArea " + d[0].series;
    })
    .attr("d", function(d, i) {
      return radarLine(d);
    })
    .style("fill", function(d, i) {
      return cfg.color(i);
    })
    .style("fill-opacity", cfg.opacityArea)
    .on("mouseover", function(d, i) {
      //Dim all blobs

      d3.selectAll(".radarArea " + d[0].series)
        .transition()
        .duration(200)
        .style("fill-opacity", 0.8);
      //Bring back the hovered over blob
      d3.select(this)
        .transition()
        .duration(200)
        .style("fill-opacity", 0.7);
    })
    .on("mouseout", function(d) {
      //Bring back all blobs

      d3.select(this)
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.opacityArea);
    });

  //Create the outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function(d, i) {
      return radarLine(d);
    })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function(d, i) {
      return cfg.color(i);
    })
    .style("fill", "none")
    .style("filter", "url(#glow)");

  let color = "";
  //Append the circles
  blobWrapper
    .selectAll(".radarCircle")
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", function(d, i) {
      if (d.percentage) {
        return rScale(d.percentage) * Math.cos(angleSlice * i - Math.PI / 2);
      }
    })
    .attr("cy", function(d, i) {
      if (d.percentage) {
        return rScale(d.percentage) * Math.sin(angleSlice * i - Math.PI / 2);
      }
    })
    .style("fill", function(d, i) {
      if (d.series.substring(0, 3) !== "cne") {
        color = "#3581b8";
      } else {
        color = "#EDC951";
      }
      return color;
    })
    .style("fill-opacity", 0.8);

  // /////////////////////////////////////////////////////// ////// Append
  // invisible circles for tooltip ///////////
  // /////////////////////////////////////////////////////// Wrapper for the
  // invisible circles on top
  var blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  //Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", cfg.dotRadius * 1.5)
    .attr("cx", function(d, i) {
      if (d.percentage) {
        return rScale(d.percentage) * Math.cos(angleSlice * i - Math.PI / 2);
      }
    })
    .attr("cy", function(d, i) {
      if (d.percentage) {
        return rScale(d.percentage) * Math.sin(angleSlice * i - Math.PI / 2);
      }
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function(d, i) {
      newX = parseFloat(d3.select(this).attr("cx")) - 10;
      newY = parseFloat(d3.select(this).attr("cy")) - 10;

      if (isNaN(newX) || isNaN(newY)) {
        newX = 0;
        newY = 0;
      }

      tooltip
        .attr("x", newX)
        .attr("y", newY)
        .attr("class", "radar-tooltip")
        .text(formatPercent(d.percentage))
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", function() {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    });

  //Set up the small tooltip for when you hover over a circle
  var tooltip = g
    .append("text")
    .attr("class", "radar-tooltip")
    .style("opacity", 0);

  // /////////////////////////////////////////////////////// /////////////////
  // Helper Function /////////////////////
  // /////////////////////////////////////////////////////// Taken from
  // http://bl.ocks.org/mbostock/7555321 Wraps SVG text
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
        words = text
          .text()
          .split(/\s+/)
          .reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("class", "radar-text")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("class", "radar-text")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  } //wrap

  // /////////////////////////////////////////////////////// /////////////////
  // Draw the Legend /////////////////////
  // ///////////////////////////////////////////////////////

  svg
    .append("g")
    .attr("class", "legendOrdinal")
    .attr(
      "transform",
      "translate(" +
        cfg["legendPosition"]["x"] +
        "," +
        cfg["legendPosition"]["y"] +
        ")"
    )
    .style("cursor", "pointer");

  var ordinal = d3
    .scaleOrdinal()
    .domain([survey[0].firm.slug.replace(".", "").trim(), "cne"])
    .range(["#3581b8", "#EDC951"]);

  var legendOrdinal = d3
    .legendColor()
    // d3 symbol creates a path-string, for example
    // "M0,-8.059274488676564L9.306048591020996, 8.059274488676564
    // -9.306048591020996,8.059274488676564Z"
    .shape(
      "path",
      d3
        .symbol()
        .type(d3.symbolTriangle)
        .size(150)()
    )
    .shapePadding(10)
    .cellFilter(function(d) {
      return d.label;
    })
    .orient("horizontal")
    .scale(ordinal)
    .on("cellover", function(d) {
      cellover(d);
    })
    .on("cellout", function(d) {
      cellout();
    });

  svg.select(".legendOrdinal").call(legendOrdinal);

  // on mouseover for the legend symbol
  function cellover(d) {
    //Dim all blobs\
    if (d === "cne") {
      d = d + "-" + ordinal.domain()[0];
    }

    //Dim all blobs
    d3.selectAll(".radarArea")
      .transition()
      .duration(200)
      .style("fill-opacity", 0.1);
    //Bring back the hovered over blob

    d3.select("." + d)
      .transition()
      .duration(200)
      .style("fill-opacity", 0.7);
  }

  // on mouseout for the legend symbol
  function cellout() {
    //Bring back all blobs
    d3.selectAll(".radarArea")
      .transition()
      .duration(200)
      .style("fill-opacity", cfg.opacityArea);
  }
}
