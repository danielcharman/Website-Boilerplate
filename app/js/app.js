'use strict';

// let React = require('react');

var bob = function bob(e) {
	console.log(e);
};

bob('arrow function yo');

var ipsumText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.';

ReactDOM.render(React.createElement(
	'div',
	null,
	'// Your work here'
), document.getElementById('impl'));

var application = {

	init: function init() {
		var self = this;

		return true;
	}

};

$(document).ready(function () {

	$('.chosen').chosen();

	$('.date-picker').datetimepicker({
		format: 'DD/MM/YYYY'
	});

	$('.row.match-height > div').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});

	$('.owl-carousel').owlCarousel({
		loop: true,
		margin: 10,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 4
			},
			1000: {
				items: 5
			}
		}
	});

	application.init();
});
//# sourceMappingURL=app.js.map
