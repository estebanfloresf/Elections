// import {
//     $,
//     $$
// } from './modules/bling';
import "../sass/style.scss";

import inlinesvg from "./modules/inline_svg";
import "./modules/orderBy";
import "./modules/sortTable";
import { BarChart } from "./candidates/candidateBar";
import { PieChart } from "./candidates/candidatePie";

$(document).ready(function() {
  inlinesvg($("img.svg"));
  BarChart();
  PieChart();
});
