$(document).ready(function () {
    $("#percentage").first().addClass("active");
    $("#list").first().addClass("active");
    $("button").click(function () {
        if (this.id === "percentage" || this.id === "name") {
        $("button").removeClass("active");

        $(this).addClass("active");

        let value = "";


        if (this.id === "percentage") {
            value = "data-value";
        }
        else {
            value = "data-name";
        }



            animateSort(".candidate", "div.media", value);
        }




    });


});

function animateSort(parent, child, sortAttribute) {


    const promises = [];
    const positions = [];
    const originals = $(parent).find(child);
    let sorted = {};

    if (sortAttribute == "data-name") {

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
        $this.css("position", "absolute").css("top", positions[originalIndex].top + "px").css("left", positions[originalIndex].left + "px");

        //animate to the new position
        const promise = $this.animate({
            top: positions[newIndex].top + "px",
            left: positions[newIndex].left + "px"
        }, 1000);
        promises.push(promise);
    });

    //instead of leaving the items out-of-order and positioned, replace them in sorted order
    $.when.apply($, promises).done(function () {
        originals.each(function (index) {
            $(this).replaceWith(sorted[index]);
        });
    });
}

