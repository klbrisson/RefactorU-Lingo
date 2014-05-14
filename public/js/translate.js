$(document).ready(function() {

    var createTranslateEl = function(inputLang, outputLang, translationInput, translationOutput) {
        var translationEl = $('.template.translation').clone();

        translationEl.find('.input-lang').text(inputLang);
        translationEl.find('.output-lang').text(outputLang);

        translationEl.find('.translate-input').text(translationInput);
        translationEl.find('.translate-output').text(translationOutput);

        translationEl.removeClass('template');

        return translationEl;
    }

    $(document).on('click', '#translate-btn', function() {
        var text = $('#translate-input').val();
        var from = $('#start-lang option:selected').data('code');
        var to = $('#end-lang option:selected').data('code');
        var fromFullLang = $('#start-lang option:selected').val();
        var toFullLang = $('#end-lang option:selected').val();
        console.log(text, from, to);

        $.post('/translate', {
            info: {
                text: text,
                from: from,
                to: to
            }
        }, function(data) {

            if (data.toLowerCase() === text.toLowerCase()) {
                console.log('same foo!')
                var $message = $('<span>Could not translate! Try Again!</span>');
                $message.hide();
                $('#translate-btn').after($message);
                $message.fadeIn(1500, function() {
                    $(this).fadeOut(1500, function() {
                        $(this).remove();
                    })
                });

                return false;
            }

            $('#translation-container').append(createTranslateEl(fromFullLang, toFullLang, text, data))


        })

        return false;
    })









})