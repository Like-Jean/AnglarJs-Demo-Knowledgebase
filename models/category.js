var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	name: {
		type: String,
		index: true,
		required: true
	},
	description: {
		type: String
	}
});

var Category = module.exports = mongoose.model('Category', categorySchema);

module.exports.getCategories = function(callback) {
	Category.find(callback);
}

module.exports.getCategoryById = function(id, callback) {
	Category.findById(id, callback);
}

//Get articles by categories
module.exports.getArticlesByCategory = function(category, callback) {
	var query = {category: category};
	Article.find(query, callback);
}

module.exports.createCategory = function(newCategory, callback) {
	newCategory.save(callback);
}