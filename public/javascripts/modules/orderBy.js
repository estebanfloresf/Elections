

function orderBy(e) {


        var promises = [];
        var positions = [];
        var originals = $(parent).find(child);
        var sorted = originals.toArray().sort(function(a, b) {
            return $(a).attr(sortAttribute) > $(b).attr(sortAttribute);
        });

        originals.each(function() {
            //store original positions
            positions.push($(this).position());
        }).each(function(originalIndex) {
            //change items to absolute position
            var $this = $(this);
            var newIndex = sorted.indexOf(this);
            sorted[newIndex] = $this.clone(); //copy the original item before messing with its positioning
            $this.css("position", "absolute").css("top", positions[originalIndex].top + "px").css("left", positions[originalIndex].left + "px");

            //animate to the new position
            var promise = $this.animate({
                top: positions[newIndex].top + "px",
                left: positions[newIndex].left + "px"
            }, 1000);
            promises.push(promise);
        });

        //instead of leaving the items out-of-order and positioned, replace them in sorted order
        $.when.apply($, promises).done(function() {
            originals.each(function(index) {
                $(this).replaceWith(sorted[index]);
            });
        });



}

export default orderBy;