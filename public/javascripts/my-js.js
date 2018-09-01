// import {
//     $,
//     $$
// } from './modules/bling';
import '../sass/style.scss';
import './modules/orderBy';
import './modules/sortTable';
// import './modules/raphael.min';
import './candidates/candidateMap';
import inlinesvg from './modules/inline_svg';

$(document).ready(function () {
    inlinesvg($('img.svg'));

});