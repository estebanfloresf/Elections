<<<<<<< HEAD
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by esteban on 15/7/17.
 */

function inlinesvg(e) {

    jQuery(e).each(function () {

        var $img = jQuery(this);

        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG


            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            // $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
}

exports.default = inlinesvg;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _bling = __webpack_require__(0);

var _inline_svg = __webpack_require__(1);

var _inline_svg2 = _interopRequireDefault(_inline_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import orderBy from './modules/orderBy';

// import resize from './modules/resizeCharts';

(0, _inline_svg2.default)((0, _bling.$$)('.svgEmbed'));

/***/ })
/******/ ]);
=======
!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r(1);var n=function(t){return t&&t.__esModule?t:{default:t}}(r(3));r(4),r(5);var a=r(6),i=r(8);$(document).ready(function(){(0,n.default)($("img.svg")),(0,a.BarChart)(),(0,i.PieChart)()})},function(t,e,r){},,function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){jQuery(t).each(function(){var t=jQuery(this),e=t.attr("id"),r=t.attr("class"),n=t.attr("src");jQuery.get(n,function(n){var a=jQuery(n).find("svg");void 0!==e&&(a=a.attr("id",e)),void 0!==r&&(a=a.attr("class",r)),!(a=a.removeAttr("xmlns:a")).attr("viewBox")&&a.attr("height")&&a.attr("width")&&a.attr("viewBox","0 0 "+a.attr("height")+" "+a.attr("width")),t.replaceWith(a)},"xml")})}},function(t,e,r){"use strict";$("#percentage").first().addClass("active");var n=$("#grid").isotope({itemSelector:".item",sortAscending:{name:!0,percentage:!1},getSortData:{name:"[name]",percentage:"[percentage]"},sortBy:["percentage","name"]});$(".btn.sort").click(function(){$(".btn.sort").removeClass("active"),$(this).addClass("active");var t=$(this).attr("data-sort-value");n.isotope({sortBy:t})})},function(t,e,r){"use strict";function n(t,e){return $(t).children("td").eq(e).text()}$("th").click(function(){var t=$(this).parents("table").eq(0),e=t.find("tr:gt(0)").toArray().sort(function(t){return function(e,r){var a=n(e,t),i=n(r,t);return $.isNumeric(a)&&$.isNumeric(i)?a-i:a.localeCompare(i)}}($(this).index()));this.asc=!this.asc,this.asc&&(e=e.reverse());for(var r=0;r<e.length;r++)t.append(e[r])})},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BarChart=function(){fetch("/api/candidates",{method:"GET",headers:new Headers({"Content-Type":"application/json"})}).then(function(t){return t.json()}).then(function(t){t.candidates.map(function(t){!function(t){var e=Math.max(0,d3.precisionFixed(.05)),r=d3.format("."+e+"%"),a={top:20,bottom:20,right:10,left:10},i=parseInt(d3.select(".barchart").style("width"))-a.left-a.right,o=parseInt(d3.select(".barchart").style("height"))-a.bottom-a.top,c=d3.select("body").append("div").attr("class","tooltip").style("opacity",0),l=n.default.lines().size(4).stroke("#c4e5f5").strokeWidth(1).background("#1d3557"),s=String(t._id).slice(-5),u=d3.select("#bar-"+s).append("svg:svg").attr("width",i+a.left+a.right).attr("height",o+a.top+a.bottom);u.call(l);var d=d3.scaleLinear().range([0,i]),p=d3.scaleBand().range([o,0]),f=u.append("g").attr("transform","translate("+a.left+","+a.top+")");d.domain([0,1]),p.domain(t.president).padding(.1),f.append("g").attr("class","x axis").attr("transform","translate(0,"+.8*o+")").call(d3.axisBottom(d).ticks(10).tickFormat(function(t){return 100*t+"%"}).tickSizeInner([.1])),f.selectAll(".background-bar").data([t]).enter().append("rect").attr("class","background-bar").attr("y",function(t){return p(t.president)}).attr("width",function(t){return d(1-parseInt(t.percentage,0))}).attr("x",0).attr("height",.8*o),f.selectAll(".bar").data([t]).enter().append("rect").attr("class","bar").style("fill",l.url()).attr("x",0).attr("height",.8*o).attr("y",function(t){return p(t.president)}).attr("width",function(t){return d(t.percentage)}),f.append("text").data([t]).attr("class","bartext").attr("x",function(t){return d(t.percentage)+20}).attr("y",o/2).text(function(t){return r(t.percentage)}),f.transition().duration(100).delay(function(t,e){return 23*e}),f.data([t]).on("mousemove",function(t){0!=d3.select(this).style("opacity")&&(c.transition().duration(200).style("opacity",.9),c.html(t.president+"<br>"+r(t.percentage)).style("left",d3.event.pageX+"px").style("top",d3.event.pageY-28+"px"))}).on("mouseout",function(){c.transition().duration(200).style("opacity",0).style("left",0).style("top",0)})}(t)})}).catch(function(t){console.log("There has been a problem with your fetch operation: "+t.message)})};var n=function(t){return t&&t.__esModule?t:{default:t}}(r(7))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){return(Math.random().toString(36)+"00000000000000000").replace(/[^a-z]+/g,"").slice(0,5)},a={circles:function(){var t=20,e="",r=2,a=!1,i="#343434",o="#343434",c=0,l=n(),s=function(n){var s=n.append("defs").append("pattern").attr("id",l).attr("patternUnits","userSpaceOnUse").attr("width",t).attr("height",t);e&&s.append("rect").attr("width",t).attr("height",t).attr("fill",e),s.append("circle").attr("cx",t/2).attr("cy",t/2).attr("r",r).attr("fill",i).attr("stroke",o).attr("stroke-width",c),a&&[[0,0],[0,t],[t,0],[t,t]].forEach(function(t){s.append("circle").attr("cx",t[0]).attr("cy",t[1]).attr("r",r).attr("fill",i).attr("stroke",o).attr("stroke-width",c)})};return s.heavier=function(t){return 0===arguments.length?r*=2:r*=2*t,s},s.lighter=function(t){return 0===arguments.length?r/=2:r/=2*t,s},s.thinner=function(e){return 0===arguments.length?t*=2:t*=2*e,s},s.thicker=function(e){return 0===arguments.length?t/=2:t/=2*e,s},s.background=function(t){return e=t,s},s.size=function(e){return t=e,s},s.complement=function(t){return a=0===arguments.length||t,s},s.radius=function(t){return r=t,s},s.fill=function(t){return i=t,s},s.stroke=function(t){return o=t,s},s.strokeWidth=function(t){return c=t,s},s.id=function(t){return 0===arguments.length?l:(l=t,s)},s.url=function(){return"url(#"+l+")"},s},lines:function(){var t=20,e="#343434",r=2,a="",i=n(),o=["diagonal"],c="auto",l=function(n){var l=n.append("defs").append("pattern").attr("id",i).attr("patternUnits","userSpaceOnUse").attr("width",t).attr("height",t);a&&l.append("rect").attr("width",t).attr("height",t).attr("fill",a),o.forEach(function(n){l.append("path").attr("d",function(e){var r=t;switch(e){case"0/8":case"vertical":return"M "+r/2+", 0 l 0, "+r;case"1/8":return"M "+r/4+",0 l "+r/2+","+r+" M "+-r/4+",0 l "+r/2+","+r+" M "+3*r/4+",0 l "+r/2+","+r;case"2/8":case"diagonal":return"M 0,"+r+" l "+r+","+-r+" M "+-r/4+","+r/4+" l "+r/2+","+-r/2+" M "+.75*r+","+5/4*r+" l "+r/2+","+-r/2;case"3/8":return"M 0,"+.75*r+" l "+r+","+-r/2+" M 0,"+r/4+" l "+r+","+-r/2+" M 0,"+5*r/4+" l "+r+","+-r/2;case"4/8":case"horizontal":return"M 0,"+r/2+" l "+r+",0";case"5/8":return"M 0,"+-r/4+" l "+r+","+r/2+"M 0,"+r/4+" l "+r+","+r/2+" M 0,"+3*r/4+" l "+r+","+r/2;case"6/8":return"M 0,0 l "+r+","+r+" M "+-r/4+","+.75*r+" l "+r/2+","+r/2+" M "+3*r/4+","+-r/4+" l "+r/2+","+r/2;case"7/8":return"M "+-r/4+",0 l "+r/2+","+r+" M "+r/4+",0 l "+r/2+","+r+" M "+3*r/4+",0 l "+r/2+","+r;default:return"M "+r/2+", 0 l 0, "+r}}(n)).attr("stroke-width",r).attr("shape-rendering",c).attr("stroke",e).attr("stroke-linecap","square")})};return l.heavier=function(t){return 0===arguments.length?r*=2:r*=2*t,l},l.lighter=function(t){return 0===arguments.length?r/=2:r/=2*t,l},l.thinner=function(e){return 0===arguments.length?t*=2:t*=2*e,l},l.thicker=function(e){return 0===arguments.length?t/=2:t/=2*e,l},l.background=function(t){return a=t,l},l.size=function(e){return t=e,l},l.orientation=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return 0===arguments.length?l:(o=e,l)},l.shapeRendering=function(t){return c=t,l},l.stroke=function(t){return e=t,l},l.strokeWidth=function(t){return r=t,l},l.id=function(t){return 0===arguments.length?i:(i=t,l)},l.url=function(){return"url(#"+i+")"},l},paths:function(){var t=1,e=1,r=20,a="#343434",i=2,o="",c=function(t){return"M "+t/4+","+3*t/4+"l"+t/4+","+-t/2+"l"+t/4+","+t/2},l=n(),s="transparent",u="auto",d=function(n){var d=function(n){var a=r;switch(n){case"squares":return"M "+a/4+" "+a/4+" l "+a/2+" 0 l 0 "+a/2+" l "+-a/2+" 0 Z";case"nylon":return"M 0 "+a/4+" l "+a/4+" 0 l 0 "+-a/4+" M "+3*a/4+" "+a+" l 0 "+-a/4+" l "+a/4+" 0 M "+a/4+" "+a/2+" l 0 "+a/4+" l "+a/4+" 0 M "+a/2+" "+a/4+" l "+a/4+" 0 l 0 "+a/4;case"waves":return"M 0 "+a/2+" c "+a/8+" "+-a/4+" , "+3*a/8+" "+-a/4+" , "+a/2+" 0 c "+a/8+" "+a/4+" , "+3*a/8+" "+a/4+" , "+a/2+" 0 M "+-a/2+" "+a/2+" c "+a/8+" "+a/4+" , "+3*a/8+" "+a/4+" , "+a/2+" 0 M "+a+" "+a/2+" c "+a/8+" "+-a/4+" , "+3*a/8+" "+-a/4+" , "+a/2+" 0";case"woven":return"M "+a/4+","+a/4+"l"+a/2+","+a/2+"M"+3*a/4+","+a/4+"l"+a/2+","+-a/2+" M"+a/4+","+3*a/4+"l"+-a/2+","+a/2+"M"+3*a/4+","+5*a/4+"l"+a/2+","+-a/2+" M"+-a/4+","+a/4+"l"+a/2+","+-a/2;case"crosses":return"M "+a/4+","+a/4+"l"+a/2+","+a/2+"M"+a/4+","+3*a/4+"l"+a/2+","+-a/2;case"caps":return"M "+a/4+","+3*a/4+"l"+a/4+","+-a/2+"l"+a/4+","+a/2;case"hexagons":return t=3,e=Math.sqrt(3),"M "+a+",0 l "+a+",0 l "+a/2+","+a*Math.sqrt(3)/2+" l "+-a/2+","+a*Math.sqrt(3)/2+" l "+-a+",0 l "+-a/2+","+-a*Math.sqrt(3)/2+" Z M 0,"+a*Math.sqrt(3)/2+" l "+a/2+",0 M "+3*a+","+a*Math.sqrt(3)/2+" l "+-a/2+",0";default:return n(a)}}(c),p=n.append("defs").append("pattern").attr("id",l).attr("patternUnits","userSpaceOnUse").attr("width",r*t).attr("height",r*e);o&&p.append("rect").attr("width",r*t).attr("height",r*e).attr("fill",o),p.append("path").attr("d",d).attr("fill",s).attr("stroke",a).attr("stroke-width",i).attr("stroke-linecap","square").attr("shape-rendering",u)};return d.heavier=function(t){return 0===arguments.length?i*=2:i*=2*t,d},d.lighter=function(t){return 0===arguments.length?i/=2:i/=2*t,d},d.thinner=function(t){return 0===arguments.length?r*=2:r*=2*t,d},d.thicker=function(t){return 0===arguments.length?r/=2:r/=2*t,d},d.background=function(t){return o=t,d},d.shapeRendering=function(t){return u=t,d},d.size=function(t){return r=t,d},d.d=function(t){return c=t,d},d.fill=function(t){return s=t,d},d.stroke=function(t){return a=t,d},d.strokeWidth=function(t){return i=t,d},d.id=function(t){return 0===arguments.length?l:(l=t,d)},d.url=function(){return"url(#"+l+")"},d}};e.default=a},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PieChart=function(){fetch("/api/candidates",{method:"GET",headers:new Headers({"Content-Type":"application/json"})}).then(function(t){return t.json()}).then(function(t){t.candidates.map(function(t){!function(t){var e=String(t._id).slice(-5),r=Math.max(0,d3.precisionFixed(.05)),n=d3.format("."+r+"%"),a=(t.totalwomen,t.total,t.totalmen,t.total,t.topProvinces);a.sort(function(t,e){return t.percentage>e.percentage?-1:t.percentage<e.percentage?1:0});var i=Math.min(80,80)/2,o=.5*i,c=.75*i,l=.65*i,s=d3.scaleOrdinal(["#ff005b","#92aab6","#1D3557","#FFC531","#3581B8"]);s.domain(a);var u=d3.select("body").append("div").attr("class","tooltip").style("opacity",0),d=d3.select("#pie-"+e).append("svg:svg").data([a]).attr("class","pie-"+e).attr("width",80).attr("height",80).append("svg:g").attr("transform","translate("+i+","+i+")"),p=d3.arc().outerRadius(i).innerRadius(o),f=d3.arc().innerRadius(c).outerRadius(i),h=d3.arc().innerRadius(l).outerRadius(i),g=d3.pie().value(function(t){return t.percentage}),v=d.selectAll("g.slice").data(g).enter().append("svg:g").attr("class","slice-"+e).on("mouseover",function(t){d3.select(this).select("path").transition().duration(.2).attr("d",h),0!=d3.select(this).style("opacity")&&(u.transition().duration(200).style("opacity",.9),u.html(t.data.province+"<br>"+n(t.data.percentage)).style("left",d3.event.pageX-50+"px").style("top",d3.event.pageY-70+"px"))}).on("mouseout",function(){u.transition().duration(200).style("opacity",0).style("left",0).style("top",0),d3.select(this).select("path").transition().duration(.2).attr("d",f)}).on("click",function(t){!function(t){var r=t.data,a=r.province,i=r.percentage,o=d3.select("#"+e+"-"+a.replace(/ +/g,"").trim()).attr("fill");d3.select(".title-"+e).style("fill",o).text(a).call(y,55),d3.select(".perc-"+e).style("fill",o).text(n(i))}(t)});function y(t,e){t.each(function(){for(var t,r=d3.select(this),n=r.text().split(/\s+/).reverse(),a=[],i=r.attr("x"),o=r.attr("y"),c=r.text(null).append("tspan").attr("x",i).attr("y",o).attr("dy","-0.6em");t=n.pop();)a.push(t),c.text(a.join(" ")),c.node().getComputedTextLength()>e&&(a.pop(),c.text(a.join(" ")),a=[t],c=r.append("tspan").attr("x",i).attr("y",o).attr("dx","-2.6em").attr("dy","0.9em").text(t))})}v.append("svg:path").attr("fill",function(t,e){return s(e)}).attr("d",p),d3.selectAll("g.slice-"+e).selectAll("path").transition().duration(750).delay(10).attr("d",f).attr("id",function(t){return e+"-"+t.data.province.trim().replace(/ /g,"")}),v.filter(function(t){return t.endAngle-t.startAngle>.2}),d.append("svg:text").attr("dy","-0.6em").style("font-size","10px").style("font-weight","bold").style("fill",function(t){return s(0)}).style("text-transform","capitalize").attr("text-anchor","middle").text(a[0].province).attr("class","title-"+e),d.append("svg:text").attr("dy","1.3em").style("font-size","10px").style("font-weight","bold").style("fill",function(t,e){return s(0)}).attr("text-anchor","middle").html(n(a[0].percentage)).attr("class","perc-"+e)}(t)})}).catch(function(t){console.log("There has been a problem with your fetch operation: "+t.message)})}}]);
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
//# sourceMappingURL=App.bundle.js.map