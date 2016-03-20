
$(document).ready(function() {
	$('.form-step.step-1').on('click', ' .button-checkout', function (event) {
		event.preventDefault();

		$('.form-step.step-1').removeClass('active');
		$('.form-step.step-2').addClass('active');

		$('.order-progress-bar .step-1').removeClass('active').addClass('done');
		$('.order-progress-bar .step-2').addClass('active');
	});

	$('.form-step.step-2').on('click', ' .button-checkout', function (event) {
		event.preventDefault();

		$('.form-step.step-2').removeClass('active');
		$('.form-step.step-3').addClass('active');

		$('.order-progress-bar .step-2').removeClass('active').addClass('done');
		$('.order-progress-bar .step-3').addClass('active');
	});
});
