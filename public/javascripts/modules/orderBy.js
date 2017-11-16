$(document).ready(function () {


    $("#percentage").first().addClass("active");
    $("#list").first().addClass("active");


    // This function is for sorting the candidates (calls the animateSort function)
    $(".btn.sort").click(function () {

        $(".btn.sort").removeClass("active");

        $(this).addClass("active");

        let value = "";



        if (this.id === "percentage") {
            value = "data-value";
        }
        else {
            value = "data-name";
        }




        animateSort(".candidate", ".col-md-12", value);

    });


    function animateSort(parent, child, sortAttribute) {


        const promises = [];
        const positions = [];
        const originals = $(parent).find(child);
        let sorted = {};


        if (sortAttribute === "data-name") {

            sorted = originals.toArray().sort(function (a, b) {

                const aName = $(a).attr(sortAttribute).toLowerCase();
                const bName = $(b).attr(sortAttribute).toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            });
        }
        else {

            sorted = originals.toArray().sort(function (a, b) {

                return $(b).attr(sortAttribute) - $(a).attr(sortAttribute);
            });
        }

        originals.each(function () {
            //store original positions
            positions.push($(this).position());
        }).each(function (originalIndex) {
            //change items to absolute position
            const $this = $(this);
            const newIndex = sorted.indexOf(this);
            sorted[newIndex] = $this.clone(); //copy the original item before messing with its positioning
            $this.css("position", "absolute")
            .css("top", positions[originalIndex].top + "px")
            .css("left", positions[originalIndex].left + "px");


            //animate to the new position
            // const promise = $this.animate({
            //     left: positions[newIndex].left + "px",
            //     top: positions[newIndex].top + "px"
            // }, 1000);

            const promise = $this.css({
                "-webkit-transform":"translateY(1000px)",
                "-ms-transform":"translateY(1000px)",
                "transform":"translateY(1000px)",
                "opacity": "0"
            });

            promises.push(promise);
        });

        //instead of leaving the items out-of-order and positioned, replace them in sorted order
        $.when.apply($, promises).done(function () {
            originals.each(function (index) {
                $(this).replaceWith(sorted[index]);
            });
        });
    }


});







