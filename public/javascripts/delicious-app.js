import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import inlinesvg from './modules/inline_svg';

import orderBy from './modules/orderBy';

inlinesvg($('.active  img.svg'));

orderBy($('#media'));


$(function() {
    $("button").click(function() {
        animateSort("#candidate", "#main", "data-value");
    });
});



