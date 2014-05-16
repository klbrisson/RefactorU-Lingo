$(document).ready(function() {

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
        questionEl.addClass('active-question');
        var quizID = $('#quizData').data('quiz-id');
        var to = $('#quizData').data('lang-code');
        var questionIndex = $('#quizData').data('question-index');

        $('#begin-quiz').remove();

        // Sends data to get new question for the quiz
        $.get('/quizword', {
                quizID: quizID,
                questionIndex: questionIndex,
                to: to,
                from: 'eng'
            },
            function(data) {
                console.log(data)
                $('#quizData').data('quiz-id', data.quizID);
                $('#quizData').data('lang-code', data.langCode);
                $('#quizData').data('question-index', data.nextIndex);
                questionEl.find('.word').text(data.translatedWord);
                $('#quizData').append(questionEl);

            }
        )
    });

    $(document).on('click', '.next-translation', function() {
        var questionEl = $('.question.template').clone();
        questionEl.removeClass('template');
        questionEl.addClass('active-question');
        var quizID = $('#quizData').data('quiz-id');
        var to = $('#quizData').data('lang-code');
        var questionIndex = $('#quizData').data('question-index');

        // Sends data to get new question for the quiz
        $.get('/quizword', {
                quizID: quizID,
                questionIndex: questionIndex,
                to: to,
                from: 'eng'
            },
            function(data) {
                console.log(data)
                $('#quizData').data('quiz-id', data.quizID);
                $('#quizData').data('lang-code', data.langCode);
                $('#quizData').data('question-index', data.nextIndex);
                questionEl.find('.word').text(data.translatedWord);
                $('#quizData').append(questionEl);

            }
        )
    });

    $(document).on('click', '.check-translation', function() {
        console.log('submit')
        var quizID = $('#quizData').data('quiz-id');
        var to = $('#quizData').data('lang-code');
        var questionIndex = $('#quizData').data('question-index');
        $.post('/checkAnswer', {},
            function(data) {
                console.log(data)
            })

    })
})