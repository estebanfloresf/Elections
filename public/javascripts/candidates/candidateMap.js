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
						console.log(data);
						// On click I add the image and the name of the province
						$('#provimg').attr('src', data.province.flag);
						$('#provname').html(data.province.name);

						// Here I build the table to display
						data.results.map((province) => {

							var id = String(province.candidate).slice(-5);

							if (province.candidate.name !== 'blancos' && province.candidate.name !== 'nulos') {

								var content = '<tr>';
								content += `<td id='${id}-total'>${parseInt(province.total,0)}</td>`;
								content += '</tr>';


								$('#table_results tbody').append(content);
								// td.text-capitalize.text-center(id=`${id}`)&attributes({'data-th': 'Candidate'})  #{candidate.president}
							}
							// $('#' + id + '-total').html(parseInt(province.total, 0));
							// $('#' + id + '-men').html(province.totalmen);
							// $('#' + id + '-women').html(province.totalwomen);
						});
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