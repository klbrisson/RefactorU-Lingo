$(document).ready(function() {

	$(document).on('click', '#translate-btn', function() {
		var text = $('#translate-input').val();
		var from = $('#start-lang option:selected').data('code');
		var to = $('#end-lang option:selected').data('code');
		console.log(text, from, to);
		$.post('/translation', {info: {text: text, from: from, to: to}}, function(data) {
			console.log(data);
		})

		return false;
	})






















})