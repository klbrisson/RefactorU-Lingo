var mongoose = require('mongoose');

var Language = mongoose.model('language', {
	name: String,
	code: String
});

module.exports = {
    languages: Language
}