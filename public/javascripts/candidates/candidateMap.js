var map_width = 500;
var map_height = 500;

var mapContainer = document.getElementById('map');
var map = new Raphael(mapContainer, map_width, map_height);



var style = {
    fill: "#f1f1f1",
    stroke: "#9c9c9c",
    "stroke-width": 1,
    "stroke-linejoin": "round",
    cursor: "pointer"
};


var provMap = {};

provinces.map(function (obj) {

        provMap[obj.name] = map.path( obj.path);
        // return newprov;

});




for (var province in provMap) {
    provMap[province]
        .attr(style)

        .attr("class", province);

}


map.setViewBox(0, 5, 1800, 1800);

// Setting preserveAspectRatio to 'none' lets you stretch the SVG
map.canvas.setAttribute('preserveAspectRatio', 'none');


var animationSpeed = 300;
var hoverStyle = {
    fill: "#3581b8"
};

var provinceSelect = "";
for (province in provMap) {
    (function (region) {

        region.attr(style);



        $(region[0]).mouseover(function () {

            region.animate(hoverStyle, animationSpeed);
        });

        $(region[0]).click(function () {




            var a = document.querySelectorAll('.pselected');
            a.map(e => {
                $(e).removeClass('pselected');
                e.setAttribute('style','fill:#f1f1f1')
            });

            $.ajax({
                method: "POST",
                url: "/provinceInfo",
                data: { province: this.getAttribute('class')},
                success : function(d){
                    console.log(d.info); //will alert ok
                }
            });

            $(this).addClass('pselected');

            this.setAttribute('style', 'fill:#1d3557');



        });



        $(region[0]).mouseleave(function () {
            region.animate(style, animationSpeed);
        });


    })(provMap[province]);
}

