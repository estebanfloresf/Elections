var map_width = 500;
var map_height = 500;

var mapContainer = document.getElementById('map');
var map = new Raphael(mapContainer, map_width, map_height);

var style = {
  fill: '#D2D5DD',
  stroke: '#798071',
  'stroke-width': 2,
  'stroke-linejoin': 'round',
  cursor: 'pointer'
};
var animationSpeed = 300;
var hoverStyle = {
  fill: '#3581b8'
};


// Here I fetch from the server express the data of provinces and then the candidates one
fetch('/api/map', {
    method: 'GET',

    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((response) => response.json())
  .then((data) => {
    var mapProvinces = [];
    const {
      provinces
    } = data;

    mapProvinces = provinces.map((province) => {
      province.path = map.path(province.path);
      province.path.attr(style).attr('class', province.name);
      return province
    })


    map.setViewBox(0, 5, 1800, 1800);
    // Setting preserveAspectRatio to 'none' lets you stretch the SVG
    map.canvas.setAttribute('preserveAspectRatio', 'none');

    // Here we map trhought each province and add the mouse functionalies for each province
    mapProvinces.map((province) => {
      const path = province.path

      $(path[0]).mouseover(function () {
        path.animate(hoverStyle, animationSpeed);
      });

      $(path[0]).click(function () {
        var x = document.getElementById("spinner");
        if (x.style.display === "none") {
          x.style.display = "block";
        }
        $('#noprov').remove();
        // On click of any province we perform the fetch of the data regarding that province
        fetch('/provinceInfo', {
            method: 'POST',
            body: JSON.stringify({
              province: String(this.getAttribute('class'))
            }), // stringify JSON
            headers: new Headers({
              'Content-Type': 'application/json'
            }) // add headers
          })
          .then((response) => response.json())
          .then((data) => {
            x.style.display = "none";
            // On click I add the image and the name of the province
            $('#provimg').attr('src', data.province.flag);
            $('#provname').html(data.province.name);
            var content = '<tr>';
            // Here I build the table to display
            data.results.map((province) => {

              var id = String(province.candidate).slice(-5);

              const candidate = data.candidates.filter((candidate) => candidate._id === province.candidate ? candidate.president : '');

              content += `<td class='text-capitalize text-center' data-th='Candidate' id='${id}'>${candidate[0].president}</td>`;
              content += `<td id='${id}-total' data-th='Total' >${parseInt(province.total,0)}</td>`;
              content += `<td id='${id}-total' data-th='Men'>${parseInt(province.totalmen,0)}</td>`;
              content += `<td id='${id}-total' data-th='Women'>${parseInt(province.totalwomen,0)}</td>`;
              content += '</tr>';

            });

            $('#table_results tbody').html(content);
          })
          .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          });
        $(this).addClass('province_active').siblings().removeClass('province_active');
      });

      $(path[0]).mouseleave(function () {
        path.animate(style, animationSpeed);
      });

    })
  })
  .catch(function (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);

  });