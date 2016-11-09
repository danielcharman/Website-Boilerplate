'use strict';

$(document).ready(function () {

	// $('.chosen').chosen();
	//
	// $('.date-picker').datetimepicker({
	// 	format: 'DD/MM/YYYY'
	// });
	//
	// $('.row.match-height > div').matchHeight({
	// 	byRow: true,
	// 	property: 'height',
	// 	target: null,
	// 	remove: false
	// });
	//
	// $('.owl-carousel').owlCarousel({
	// 	loop: true,
	// 	margin: 10,
	// 	nav: false,
	// 	autoplay: true,
	// 	autoplayTimeout: 5000,
	// 	responsive:{
	// 		0:{
	// 			items:2
	// 		},
	// 		600:{
	// 			items:4
	// 		},
	// 		1000:{
	// 			items:5
	// 		}
	// 	}
	// });

	$('.header-menu .btn').on('click', function (e) {
		$(this).parent().find('.menu').toggleClass('open');
	});
});

//testing es6 and jsx example
var sampleText = 'Testing ES6 & JSX support';
var arrowFunc = function arrowFunc(e) {
	return e;
};

ReactDOM.render(React.createElement(
	'div',
	null,
	React.createElement(
		'p',
		null,
		React.createElement('i', { className: 'fa fa-check' }),
		arrowFunc(sampleText)
	)
), document.getElementById('example'));
