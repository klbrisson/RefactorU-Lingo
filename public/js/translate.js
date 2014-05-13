$(document).ready(function() {

	$(document).on('click', '#translate-btn', function() {
		$.post('/translation', $('form').serialize(), function(data) {
			console.log(data);
		})

		return false;
	})






















})