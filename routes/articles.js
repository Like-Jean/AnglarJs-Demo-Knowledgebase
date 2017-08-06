var express = require('express');
var router = express.Router();

var Article = require("../models/article");

router.get('/', function(req, res, next) {
  Article.getArticles(function(err, articles) {
  	if(err) {
  		console.log(err);
  	}
  	else {
  		res.json(articles);
  	}
  });
});

//Get article by id
router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id, function(err, article) {
  	if(err) {
  		console.log(err);
  	}
  	else {
  		res.json(article);
  	}
  });
});

//Get articles by category
router.get('/category/:categoryname', function(req, res, next) {
  Article.getArticlesByCategory(req.params.categoryname, function(err, articles) {
  	if(err) {
  		console.log(err);
  	}
  	else {
  		res.json(articles);
  	}
  });
});

//Create articles
router.post('/', function(req, res, next) {
  //Get form values
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  var newArticle = new Article({
  	title: title,
  	body: body,
  	category: category
  });

  Article.createArticle(newArticle, function(err, article){
  	if (err) {
  		console.log(err);
  	}

  	res.location("/articles");
  	res.redirect("/articles");
  });
});

//Update articles
router.put('/', function(req, res, next) {
  //Get form values
  var id = req.body.id;

  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  var data = {
  	title: title,
  	body: body,
  	category: category
  };

  Article.updateArticle(id, data, function(err, article){
  	if (err) {
  		console.log(err);
  	}

  	res.location("/articles");
  	res.redirect("/articles");
  });
});

//Delete articles
router.delete('/:id', function(req, res, next) {
  //Get form values
  var id = req.params.id;


  Article.deleteArticle(id, function(err, article){
  	if (err) {
  		console.log(err);
  	}

  	res.location("/articles");
  	res.redirect("/articles");
  });
});

module.exports = router;
