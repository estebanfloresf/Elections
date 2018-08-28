$("#percentage").first().addClass("active");

// Isotope https://isotope.metafizzy.co/sorting.html
var $grid = $('#grid').isotope({
    itemSelector: '.item',
    sortAscending: {
        name: true,
        
        percentage: false
      },
    getSortData: {
        name: '[name]',
        percentage: '[percentage]'
    },
    // sort by percentage then name
    sortBy: ['percentage', 'name']
});



// This function is for sorting the candidates 
$(".btn.sort").click(function () {

    $(".btn.sort").removeClass("active");
    $(this).addClass("active");

    var sortValue = $(this).attr('data-sort-value');
    
    console.log(sortValue);

    $grid.isotope({
        sortBy: sortValue
    });   

});



