!(function(e) {
  var c = {};
  function a(t) {
    if (c[t]) return c[t].exports;
    var n = (c[t] = { i: t, l: !1, exports: {} });
    return e[t].call(n.exports, n, n.exports, a), (n.l = !0), n.exports;
  }
  (a.m = e),
    (a.c = c),
    (a.d = function(t, n, e) {
      a.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: e });
    }),
    (a.r = function(t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (a.t = function(n, t) {
      if ((1 & t && (n = a(n)), 8 & t)) return n;
      if (4 & t && "object" == typeof n && n && n.__esModule) return n;
      var e = Object.create(null);
      if (
        (a.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: n }),
        2 & t && "string" != typeof n)
      )
        for (var c in n)
          a.d(
            e,
            c,
            function(t) {
              return n[t];
            }.bind(null, c)
          );
      return e;
    }),
    (a.n = function(t) {
      var n =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return a.d(n, "a", n), n;
    }),
    (a.o = function(t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }),
    (a.p = ""),
    a((a.s = 0));
})([
  function(t, n, e) {
    "use strict";
    e(1);
    var c,
      a = e(2),
      r = (c = a) && c.__esModule ? c : { default: c };
    e(3), e(4);
    var o = e(5),
      i = e(7);
    $(document).ready(function() {
      (0, r.default)($("img.svg")), (0, o.BarChart)(), (0, i.PieChart)();
    });
  },
  function(t, n, e) {},
  function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 }),
      (n.default = function(t) {
        jQuery(t).each(function() {
          var e = jQuery(this),
            c = e.attr("id"),
            a = e.attr("class"),
            t = e.attr("src");
          jQuery.get(
            t,
            function(t) {
              var n = jQuery(t).find("svg");
              void 0 !== c && (n = n.attr("id", c)),
                void 0 !== a && (n = n.attr("class", a)),
                !(n = n.removeAttr("xmlns:a")).attr("viewBox") &&
                  n.attr("height") &&
                  n.attr("width") &&
                  n.attr(
                    "viewBox",
                    "0 0 " + n.attr("height") + " " + n.attr("width")
                  ),
                e.replaceWith(n);
            },
            "xml"
          );
        });
      });
  },
  function(t, n, e) {
    "use strict";
    $("#percentage")
      .first()
      .addClass("active");
    var c = $("#grid").isotope({
      itemSelector: ".item",
      sortAscending: { name: !0, percentage: !1 },
      getSortData: { name: "[name]", percentage: "[percentage]" },
      sortBy: ["percentage", "name"]
    });
    $(".btn.sort").click(function() {
      $(".btn.sort").removeClass("active"), $(this).addClass("active");
      var t = $(this).attr("data-sort-value");
      c.isotope({ sortBy: t });
    });
  },
  function(t, n, e) {
    "use strict";
    function r(t, n) {
      return $(t)
        .children("td")
        .eq(n)
        .text();
    }
    $("th").click(function() {
      var a,
        t = $(this)
          .parents("table")
          .eq(0),
        n = t
          .find("tr:gt(0)")
          .toArray()
          .sort(
            ((a = $(this).index()),
            function(t, n) {
              var e = r(t, a),
                c = r(n, a);
              return $.isNumeric(e) && $.isNumeric(c)
                ? e - c
                : e.localeCompare(c);
            })
          );
      (this.asc = !this.asc), this.asc && (n = n.reverse());
      for (var e = 0; e < n.length; e++) t.append(n[e]);
    });
  },
  function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 }),
      (n.BarChart = function() {
        fetch("/api/candidates", {
          method: "GET",
          headers: new Headers({ "Content-Type": "application/json" })
        })
          .then(function(t) {
            return t.json();
          })
          .then(function(t) {
            t.candidates.map(function(t) {
              !(function(t) {
                var n = Math.max(0, d3.precisionFixed(0.05)),
                  e = d3.format("." + n + "%"),
                  c = 20,
                  a = 20,
                  r = 10,
                  o = 10,
                  i = parseInt(d3.select(".barchart").style("width")) - o - r,
                  s = parseInt(d3.select(".barchart").style("height")) - a - c,
                  l = d3
                    .select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0),
                  u = v.default
                    .lines()
                    .size(4)
                    .stroke("#c4e5f5")
                    .strokeWidth(1)
                    .background("#1d3557"),
                  d = String(t._id).slice(-5),
                  p = d3
                    .select("#bar-" + d)
                    .append("svg:svg")
                    .attr("width", i + o + r)
                    .attr("height", s + c + a);
                p.call(u);
                var f = d3.scaleLinear().range([0, i]),
                  h = d3.scaleBand().range([s, 0]),
                  g = p
                    .append("g")
                    .attr("transform", "translate(" + o + "," + c + ")");
                f.domain([0, 1]),
                  h.domain(t.president).padding(0.1),
                  g
                    .append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + 0.8 * s + ")")
                    .call(
                      d3
                        .axisBottom(f)
                        .ticks(10)
                        .tickFormat(function(t) {
                          return 100 * t + "%";
                        })
                        .tickSizeInner([0.1])
                    ),
                  g
                    .selectAll(".background-bar")
                    .data([t])
                    .enter()
                    .append("rect")
                    .attr("class", "background-bar")
                    .attr("y", function(t) {
                      return h(t.president);
                    })
                    .attr("width", function(t) {
                      return f(1 - parseInt(t.percentage, 0));
                    })
                    .attr("x", 0)
                    .attr("height", 0.8 * s),
                  g
                    .selectAll(".bar")
                    .data([t])
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .style("fill", u.url())
                    .attr("x", 0)
                    .attr("height", 0.8 * s)
                    .attr("y", function(t) {
                      return h(t.president);
                    })
                    .attr("width", function(t) {
                      return f(t.percentage);
                    }),
                  g
                    .append("text")
                    .data([t])
                    .attr("class", "bartext")
                    .attr("x", function(t) {
                      return f(t.percentage) + 20;
                    })
                    .attr("y", s / 2)
                    .text(function(t) {
                      return e(t.percentage);
                    }),
                  g
                    .transition()
                    .duration(100)
                    .delay(function(t, n) {
                      return 23 * n;
                    }),
                  g
                    .data([t])
                    .on("mousemove", function(t) {
                      0 != d3.select(this).style("opacity") &&
                        (l
                          .transition()
                          .duration(200)
                          .style("opacity", 0.9),
                        l
                          .html(t.president + "<br>" + e(t.percentage))
                          .style("left", d3.event.pageX + "px")
                          .style("top", d3.event.pageY - 28 + "px"));
                    })
                    .on("mouseout", function() {
                      l.transition()
                        .duration(200)
                        .style("opacity", 0)
                        .style("left", 0)
                        .style("top", 0);
                    });
              })(t);
            });
          })
          .catch(function(t) {
            console.log(
              "There has been a problem with your fetch operation: " + t.message
            );
          });
      });
    var c,
      a = e(6),
      v = (c = a) && c.__esModule ? c : { default: c };
  },
  function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 });
    function f() {
      return ""
        .concat(Math.random().toString(36), "00000000000000000")
        .replace(/[^a-z]+/g, "")
        .slice(0, 5);
    }
    var c = {
      circles: function() {
        function n(t) {
          var n = t
            .append("defs")
            .append("pattern")
            .attr("id", l)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", e)
            .attr("height", e);
          c &&
            n
              .append("rect")
              .attr("width", e)
              .attr("height", e)
              .attr("fill", c),
            n
              .append("circle")
              .attr("cx", e / 2)
              .attr("cy", e / 2)
              .attr("r", a)
              .attr("fill", o)
              .attr("stroke", i)
              .attr("stroke-width", s),
            r &&
              [
                [0, 0],
                [0, e],
                [e, 0],
                [e, e]
              ].forEach(function(t) {
                n.append("circle")
                  .attr("cx", t[0])
                  .attr("cy", t[1])
                  .attr("r", a)
                  .attr("fill", o)
                  .attr("stroke", i)
                  .attr("stroke-width", s);
              });
        }
        var e = 20,
          c = "",
          a = 2,
          r = !1,
          o = "#343434",
          i = "#343434",
          s = 0,
          l = f();
        return (
          (n.heavier = function(t) {
            return (a *= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.lighter = function(t) {
            return (a /= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.thinner = function(t) {
            return (e *= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.thicker = function(t) {
            return (e /= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.background = function(t) {
            return (c = t), n;
          }),
          (n.size = function(t) {
            return (e = t), n;
          }),
          (n.complement = function(t) {
            return (r = 0 === arguments.length || t), n;
          }),
          (n.radius = function(t) {
            return (a = t), n;
          }),
          (n.fill = function(t) {
            return (o = t), n;
          }),
          (n.stroke = function(t) {
            return (i = t), n;
          }),
          (n.strokeWidth = function(t) {
            return (s = t), n;
          }),
          (n.id = function(t) {
            return 0 === arguments.length ? l : ((l = t), n);
          }),
          (n.url = function() {
            return "url(#".concat(l, ")");
          }),
          n
        );
      },
      lines: function() {
        function c(t) {
          var n = t
            .append("defs")
            .append("pattern")
            .attr("id", i)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", e)
            .attr("height", e);
          o &&
            n
              .append("rect")
              .attr("width", e)
              .attr("height", e)
              .attr("fill", o),
            s.forEach(function(t) {
              n.append("path")
                .attr(
                  "d",
                  (function(t) {
                    var n = e;
                    switch (t) {
                      case "0/8":
                      case "vertical":
                        return "M ".concat(n / 2, ", 0 l 0, ").concat(n);
                      case "1/8":
                        return "M "
                          .concat(n / 4, ",0 l ")
                          .concat(n / 2, ",")
                          .concat(n, " M ")
                          .concat(-n / 4, ",0 l ")
                          .concat(n / 2, ",")
                          .concat(n, " M ")
                          .concat((3 * n) / 4, ",0 l ")
                          .concat(n / 2, ",")
                          .concat(n);
                      case "2/8":
                      case "diagonal":
                        return "M 0,"
                          .concat(n, " l ")
                          .concat(n, ",")
                          .concat(-n, " M ")
                          .concat(-n / 4, ",")
                          .concat(n / 4, " l ")
                          .concat(n / 2, ",")
                          .concat(-n / 2, " M ")
                          .concat(0.75 * n, ",")
                          .concat((5 / 4) * n, " l ")
                          .concat(n / 2, ",")
                          .concat(-n / 2);
                      case "3/8":
                        return "M 0,"
                          .concat(0.75 * n, " l ")
                          .concat(n, ",")
                          .concat(-n / 2, " M 0,")
                          .concat(n / 4, " l ")
                          .concat(n, ",")
                          .concat(-n / 2, " M 0,")
                          .concat((5 * n) / 4, " l ")
                          .concat(n, ",")
                          .concat(-n / 2);
                      case "4/8":
                      case "horizontal":
                        return "M 0,".concat(n / 2, " l ").concat(n, ",0");
                      case "5/8":
                        return "M 0,"
                          .concat(-n / 4, " l ")
                          .concat(n, ",")
                          .concat(n / 2, "M 0,")
                          .concat(n / 4, " l ")
                          .concat(n, ",")
                          .concat(n / 2, " M 0,")
                          .concat((3 * n) / 4, " l ")
                          .concat(n, ",")
                          .concat(n / 2);
                      case "6/8":
                        return "M 0,0 l "
                          .concat(n, ",")
                          .concat(n, " M ")
                          .concat(-n / 4, ",")
                          .concat(0.75 * n, " l ")
                          .concat(n / 2, ",")
                          .concat(n / 2, " M ")
                          .concat((3 * n) / 4, ",")
                          .concat(-n / 4, " l ")
                          .concat(n / 2, ",")
                          .concat(n / 2);
                      case "7/8":
                        return "M "
                          .concat(-n / 4, ",0 l ")
                          .concat(n / 2, ",")
                          .concat(n, " M ")
                          .concat(n / 4, ",0 l ")
                          .concat(n / 2, ",")
                          .concat(n, " M ")
                          .concat((3 * n) / 4, ",0 l ")
                          .concat(n / 2, ",")
                          .concat(n);
                      default:
                        return "M ".concat(n / 2, ", 0 l 0, ").concat(n);
                    }
                  })(t)
                )
                .attr("stroke-width", r)
                .attr("shape-rendering", l)
                .attr("stroke", a)
                .attr("stroke-linecap", "square");
            });
        }
        var e = 20,
          a = "#343434",
          r = 2,
          o = "",
          i = f(),
          s = ["diagonal"],
          l = "auto";
        return (
          (c.heavier = function(t) {
            return (r *= 0 === arguments.length ? 2 : 2 * t), c;
          }),
          (c.lighter = function(t) {
            return (r /= 0 === arguments.length ? 2 : 2 * t), c;
          }),
          (c.thinner = function(t) {
            return (e *= 0 === arguments.length ? 2 : 2 * t), c;
          }),
          (c.thicker = function(t) {
            return (e /= 0 === arguments.length ? 2 : 2 * t), c;
          }),
          (c.background = function(t) {
            return (o = t), c;
          }),
          (c.size = function(t) {
            return (e = t), c;
          }),
          (c.orientation = function() {
            for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
              n[e] = arguments[e];
            return 0 === arguments.length || (s = n), c;
          }),
          (c.shapeRendering = function(t) {
            return (l = t), c;
          }),
          (c.stroke = function(t) {
            return (a = t), c;
          }),
          (c.strokeWidth = function(t) {
            return (r = t), c;
          }),
          (c.id = function(t) {
            return 0 === arguments.length ? i : ((i = t), c);
          }),
          (c.url = function() {
            return "url(#".concat(i, ")");
          }),
          c
        );
      },
      paths: function() {
        function n(t) {
          var n = (function(t) {
              var n = r;
              switch (t) {
                case "squares":
                  return "M "
                    .concat(n / 4, " ")
                    .concat(n / 4, " l ")
                    .concat(n / 2, " 0 l 0 ")
                    .concat(n / 2, " l ")
                    .concat(-n / 2, " 0 Z");
                case "nylon":
                  return "M 0 "
                    .concat(n / 4, " l ")
                    .concat(n / 4, " 0 l 0 ")
                    .concat(-n / 4, " M ")
                    .concat((3 * n) / 4, " ")
                    .concat(n, " l 0 ")
                    .concat(-n / 4, " l ")
                    .concat(n / 4, " 0 M ")
                    .concat(n / 4, " ")
                    .concat(n / 2, " l 0 ")
                    .concat(n / 4, " l ")
                    .concat(n / 4, " 0 M ")
                    .concat(n / 2, " ")
                    .concat(n / 4, " l ")
                    .concat(n / 4, " 0 l 0 ")
                    .concat(n / 4);
                case "waves":
                  return "M 0 "
                    .concat(n / 2, " c ")
                    .concat(n / 8, " ")
                    .concat(-n / 4, " , ")
                    .concat((3 * n) / 8, " ")
                    .concat(-n / 4, " , ")
                    .concat(n / 2, " 0 c ")
                    .concat(n / 8, " ")
                    .concat(n / 4, " , ")
                    .concat((3 * n) / 8, " ")
                    .concat(n / 4, " , ")
                    .concat(n / 2, " 0 M ")
                    .concat(-n / 2, " ")
                    .concat(n / 2, " c ")
                    .concat(n / 8, " ")
                    .concat(n / 4, " , ")
                    .concat((3 * n) / 8, " ")
                    .concat(n / 4, " , ")
                    .concat(n / 2, " 0 M ")
                    .concat(n, " ")
                    .concat(n / 2, " c ")
                    .concat(n / 8, " ")
                    .concat(-n / 4, " , ")
                    .concat((3 * n) / 8, " ")
                    .concat(-n / 4, " , ")
                    .concat(n / 2, " 0");
                case "woven":
                  return "M "
                    .concat(n / 4, ",")
                    .concat(n / 4, "l")
                    .concat(n / 2, ",")
                    .concat(n / 2, "M")
                    .concat((3 * n) / 4, ",")
                    .concat(n / 4, "l")
                    .concat(n / 2, ",")
                    .concat(-n / 2, " M")
                    .concat(n / 4, ",")
                    .concat((3 * n) / 4, "l")
                    .concat(-n / 2, ",")
                    .concat(n / 2, "M")
                    .concat((3 * n) / 4, ",")
                    .concat((5 * n) / 4, "l")
                    .concat(n / 2, ",")
                    .concat(-n / 2, " M")
                    .concat(-n / 4, ",")
                    .concat(n / 4, "l")
                    .concat(n / 2, ",")
                    .concat(-n / 2);
                case "crosses":
                  return "M "
                    .concat(n / 4, ",")
                    .concat(n / 4, "l")
                    .concat(n / 2, ",")
                    .concat(n / 2, "M")
                    .concat(n / 4, ",")
                    .concat((3 * n) / 4, "l")
                    .concat(n / 2, ",")
                    .concat(-n / 2);
                case "caps":
                  return "M "
                    .concat(n / 4, ",")
                    .concat((3 * n) / 4, "l")
                    .concat(n / 4, ",")
                    .concat(-n / 2, "l")
                    .concat(n / 4, ",")
                    .concat(n / 2);
                case "hexagons":
                  return (
                    (c = 3),
                    (a = Math.sqrt(3)),
                    "M "
                      .concat(n, ",0 l ")
                      .concat(n, ",0 l ")
                      .concat(n / 2, ",")
                      .concat((n * Math.sqrt(3)) / 2, " l ")
                      .concat(-n / 2, ",")
                      .concat((n * Math.sqrt(3)) / 2, " l ")
                      .concat(-n, ",0 l ")
                      .concat(-n / 2, ",")
                      .concat((-n * Math.sqrt(3)) / 2, " Z M 0,")
                      .concat((n * Math.sqrt(3)) / 2, " l ")
                      .concat(n / 2, ",0 M ")
                      .concat(3 * n, ",")
                      .concat((n * Math.sqrt(3)) / 2, " l ")
                      .concat(-n / 2, ",0")
                  );
                default:
                  return t(n);
              }
            })(l),
            e = t
              .append("defs")
              .append("pattern")
              .attr("id", u)
              .attr("patternUnits", "userSpaceOnUse")
              .attr("width", r * c)
              .attr("height", r * a);
          s &&
            e
              .append("rect")
              .attr("width", r * c)
              .attr("height", r * a)
              .attr("fill", s),
            e
              .append("path")
              .attr("d", n)
              .attr("fill", d)
              .attr("stroke", o)
              .attr("stroke-width", i)
              .attr("stroke-linecap", "square")
              .attr("shape-rendering", p);
        }
        var c = 1,
          a = 1,
          r = 20,
          o = "#343434",
          i = 2,
          s = "",
          l = function(t) {
            return "M "
              .concat(t / 4, ",")
              .concat((3 * t) / 4, "l")
              .concat(t / 4, ",")
              .concat(-t / 2, "l")
              .concat(t / 4, ",")
              .concat(t / 2);
          },
          u = f(),
          d = "transparent",
          p = "auto";
        return (
          (n.heavier = function(t) {
            return (i *= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.lighter = function(t) {
            return (i /= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.thinner = function(t) {
            return (r *= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.thicker = function(t) {
            return (r /= 0 === arguments.length ? 2 : 2 * t), n;
          }),
          (n.background = function(t) {
            return (s = t), n;
          }),
          (n.shapeRendering = function(t) {
            return (p = t), n;
          }),
          (n.size = function(t) {
            return (r = t), n;
          }),
          (n.d = function(t) {
            return (l = t), n;
          }),
          (n.fill = function(t) {
            return (d = t), n;
          }),
          (n.stroke = function(t) {
            return (o = t), n;
          }),
          (n.strokeWidth = function(t) {
            return (i = t), n;
          }),
          (n.id = function(t) {
            return 0 === arguments.length ? u : ((u = t), n);
          }),
          (n.url = function() {
            return "url(#".concat(u, ")");
          }),
          n
        );
      }
    };
    n.default = c;
  },
  function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", { value: !0 }),
      (n.PieChart = function() {
        fetch("/api/candidates", {
          method: "GET",
          headers: new Headers({ "Content-Type": "application/json" })
        })
          .then(function(t) {
            return t.json();
          })
          .then(function(t) {
            t.candidates.map(function(t) {
              !(function(t) {
                var r = String(t._id).slice(-5),
                  n = Math.max(0, d3.precisionFixed(0.05)),
                  o = d3.format("." + n + "%"),
                  e =
                    (t.totalwomen,
                    t.total,
                    t.totalmen,
                    t.total,
                    t.topProvinces);
                e.sort(function(t, n) {
                  return t.percentage > n.percentage
                    ? -1
                    : t.percentage < n.percentage
                    ? 1
                    : 0;
                });
                var c = Math.min(80, 80) / 2,
                  a = 0.5 * c,
                  i = 0.75 * c,
                  s = 0.65 * c,
                  l = d3.scaleOrdinal([
                    "#ff005b",
                    "#92aab6",
                    "#1D3557",
                    "#FFC531",
                    "#3581B8"
                  ]);
                l.domain(e);
                var u = d3
                    .select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0),
                  d = d3
                    .select("#pie-" + r)
                    .append("svg:svg")
                    .data([e])
                    .attr("class", "pie-" + r)
                    .attr("width", 80)
                    .attr("height", 80)
                    .append("svg:g")
                    .attr("transform", "translate(" + c + "," + c + ")"),
                  p = d3
                    .arc()
                    .outerRadius(c)
                    .innerRadius(a),
                  f = d3
                    .arc()
                    .innerRadius(i)
                    .outerRadius(c),
                  h = d3
                    .arc()
                    .innerRadius(s)
                    .outerRadius(c),
                  g = d3.pie().value(function(t) {
                    return t.percentage;
                  }),
                  v = d
                    .selectAll("g.slice")
                    .data(g)
                    .enter()
                    .append("svg:g")
                    .attr("class", "slice-" + r)
                    .on("mouseover", function(t) {
                      d3
                        .select(this)
                        .select("path")
                        .transition()
                        .duration(0.2)
                        .attr("d", h),
                        0 != d3.select(this).style("opacity") &&
                          (u
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9),
                          u
                            .html(
                              t.data.province + "<br>" + o(t.data.percentage)
                            )
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px"));
                    })
                    .on("mouseout", function() {
                      u
                        .transition()
                        .duration(200)
                        .style("opacity", 0)
                        .style("left", 0)
                        .style("top", 0),
                        d3
                          .select(this)
                          .select("path")
                          .transition()
                          .duration(0.2)
                          .attr("d", f);
                    })
                    .on("click", function(t) {
                      var n, e, c, a;
                      (n = t.data),
                        (e = n.province),
                        (c = n.percentage),
                        (a = d3
                          .select("#" + r + "-" + e.replace(/ +/g, "").trim())
                          .attr("fill")),
                        d3
                          .select(".title-" + r)
                          .style("fill", a)
                          .text(e)
                          .call(y, 55),
                        d3
                          .select(".perc-" + r)
                          .style("fill", a)
                          .text(o(c));
                    });
                function y(t, i) {
                  t.each(function() {
                    for (
                      var t,
                        n = d3.select(this),
                        e = n
                          .text()
                          .split(/\s+/)
                          .reverse(),
                        c = [],
                        a = n.attr("x"),
                        r = n.attr("y"),
                        o = n
                          .text(null)
                          .append("tspan")
                          .attr("x", a)
                          .attr("y", r)
                          .attr("dy", "-0.6em");
                      (t = e.pop());

                    )
                      c.push(t),
                        o.text(c.join(" ")),
                        o.node().getComputedTextLength() > i &&
                          (c.pop(),
                          o.text(c.join(" ")),
                          (c = [t]),
                          (o = n
                            .append("tspan")
                            .attr("x", a)
                            .attr("y", r)
                            .attr("dx", "-2.6em")
                            .attr("dy", "0.9em")
                            .text(t)));
                  });
                }
                v
                  .append("svg:path")
                  .attr("fill", function(t, n) {
                    return l(n);
                  })
                  .attr("d", p),
                  d3
                    .selectAll("g.slice-" + r)
                    .selectAll("path")
                    .transition()
                    .duration(750)
                    .delay(10)
                    .attr("d", f)
                    .attr("id", function(t) {
                      return r + "-" + t.data.province.trim().replace(/ /g, "");
                    }),
                  v.filter(function(t) {
                    return 0.2 < t.endAngle - t.startAngle;
                  }),
                  d
                    .append("svg:text")
                    .attr("dy", "-0.6em")
                    .style("font-size", "10px")
                    .style("font-weight", "bold")
                    .style("fill", function(t) {
                      return l(0);
                    })
                    .style("text-transform", "capitalize")
                    .attr("text-anchor", "middle")
                    .text(e[0].province)
                    .attr("class", "title-" + r),
                  d
                    .append("svg:text")
                    .attr("dy", "1.3em")
                    .style("font-size", "10px")
                    .style("font-weight", "bold")
                    .style("fill", function(t, n) {
                      return l(0);
                    })
                    .attr("text-anchor", "middle")
                    .html(o(e[0].percentage))
                    .attr("class", "perc-" + r);
              })(t);
            });
          })
          .catch(function(t) {
            console.log(
              "There has been a problem with your fetch operation: " + t.message
            );
          });
      });
  }
]);
//# sourceMappingURL=App.bundle.js.map
