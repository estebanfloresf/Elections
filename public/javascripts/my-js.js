// import {
//     $,
//     $$
// } from './modules/bling';
import '../sass/style.scss';

import './modules/orderBy';
import './modules/sortTable';
// import './modules/raphael.min';
// import './candidates/candidateMap';
import {
  makeBarChart
} from './candidates/candidateBar';
import './candidates/candidatePie';
import inlinesvg from './modules/inline_svg';

$(document).ready(function () {
  inlinesvg($('img.svg'));
  makeBarChart();


});

// $(window).resize(function () {
//   redraw();
// });