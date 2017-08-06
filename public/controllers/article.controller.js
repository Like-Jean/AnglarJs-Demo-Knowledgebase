app.controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('/articles').then(function(response) {
		$scope.articles = response.data;
	});
}]);

app.controller('ArticlesCategoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('/articles/category/' + $routeParams.category).then(function(response) {
		$scope.cat_articles = response.data;
		$scope.category = $routeParams.category;
	});
}]);

app.controller('ArticleDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
	$http.get('/articles/' + $routeParams.id).then(function(response) {
		$scope.article = response.data;
	});

	$scope.removeArticle = function() {
		$http.delete('/articles/' + $routeParams.id).then(function(response) {
			console.log(response.status);
		})

		$location.path("/articles");
	};

}]);

app.controller('ArticleCreateCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
	$http.get('/categories').then(function(response) {
		$scope.categories = response.data;
	});

	$scope.addArticle = function() {
		var data = {
			title: $scope.title,
			body: $scope.body,
			category: $scope.category
		}

		$http.post("/articles", data).then(function(response) {
			console.log(response.status);

		});

		$location.path("/articles");
	}
}]);

app.controller('ArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
	$http.get('/categories').then(function(response) {
		$scope.categories = response.data;
	});

	$http.get('/articles/' + $routeParams.id).then(function(response) {
		$scope.article = response.data;
	});

	$scope.editArticle = function() {
		var data = {
			id: 		$routeParams.id,
			title: 		$scope.article.title,
			body: 		$scope.article.body,
			category: 	$scope.article.category
		}

		$http.put("/articles", data).then(function(status, data) {
			console.log(status);
		});

		$location.path("/articles");
	}
}]);