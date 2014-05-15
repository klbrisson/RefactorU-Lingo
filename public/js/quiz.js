

$(document).ready(function () {

	$(document).on('change', '#quiz-lang', function() {
		console.log('changed');
		console.log(window.location.href + "/" + quizLang + '?langCode=' + quizLangCode);
		var quizLangCode = $('#quiz-lang option:selected').data('code');
    var quizLang = $('#quiz-lang option:selected').val();
		$('#create-quiz').attr('href', window.location.href + "/" + quizLang + '?langCode=' + quizLangCode);
	})

// 
	$(document).on('click', '#begin-quiz', function() {
	// Grabs info for get request
		var questionEl = $('.question.template').clone();
		questionEl.removeClass('template');
		var quizID = $('#quizData').data('quiz-id');
		var to = $('#quizData').data('lang-code');
		var questionIndex = $('#quizData').data('question-index');

	// Sends data to get new question for the quiz
		$.get('/quizword',
			{	quizID: quizID,
				questionIndex: questionIndex,
				to: to,
				from: 'eng'
			},
			function(data){
				console.log(data)
			})
	})







})