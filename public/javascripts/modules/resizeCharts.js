import {$,$$} from './bling';

// d3.select("#bar-" + last)
// .append("div")
// .attr("class", "svg-container") //container class to make it responsive
// .append("svg")
// //responsive SVG needs these 2 attributes and no width and height attr
// .attr("preserveAspectRatio", "xMinYMin meet")
// .attr("viewBox", "0 0 600 400")
// //class to make it responsive
// .attr("class","svg-content-responsive");

function resize(){
    var a  = $$('barchart');
    console.log(a);
}

export default resize;

// d3.select(window)
//     .on("resize", function () {
//         console.log("entro");
//         var targetWidth = chart.node().getBoundingClientRect().width;
//         chart.attr("width", targetWidth);
//         chart.attr("height", targetWidth / aspect);
//     });