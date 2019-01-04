//
// I came across this, and thought I'd throw in my 2 cents. Click on the column headers to sort ascending, and again to sort descending.
//
// Works in Chrome, Firefox, Opera AND IE(8)
// Only uses JQuery
// Does alpha and numeric sorting - ascending and descending
<<<<<<< HEAD
=======




>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
$('th').click(function () {
    var table = $(this).parents('table').eq(0);

    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
<<<<<<< HEAD
    if (!this.asc) {
=======
    if (this.asc) {
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
        rows = rows.reverse()
    }
    for (var i = 0; i < rows.length; i++) {
        table.append(rows[i])
    }
});

function comparer(index) {
    return function (a, b) {
<<<<<<< HEAD
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
=======
        var valA = getCellValue(a, index),
            valB = getCellValue(b, index)
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
}

function getCellValue(row, index) {
    return $(row).children('td').eq(index).text()
}