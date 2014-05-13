$(document).ready(function() {

    var createTranslateEl = function(inputLang, outputLang, translationInput, translationOutput) {
        var translationEl = $('.template.translation').clone();

        translationEl.find('.input-lang').text(inputLang);
        translationEl.find('.output-lang').text(outputLang);

        translationEl.find('.translate-input').text(translationInput);
        translationEl.find('.translate-output').text(translationOutput);

        return translationEl;
    }

    $(document).on('click', '#translate-btn', function() {
        var text = $('#translate-input').val();
        var from = $('#start-lang option:selected').data('code');
        var to = $('#end-lang option:selected').data('code');
        console.log(text, from, to);

        $.post('/translation', {
            info: {
                text: text,
                from: from,
                to: to
            }
        }, function(data) {

            if (data.toLowerCase() === text.toLowerCase()) {
                console.log('same foo!')
            }

            console.log(data);

            $('#translation-container').append(createTranslateEl(from, to, text, data))


        })

        return false;
    })









})