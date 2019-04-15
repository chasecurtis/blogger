var app = angular.module('bloggerApp', ['ngRoute']);

/* Router Provider */
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/index.html',
			controller: 'IndexController',
			controllerAs: 'vm'
		})
		
		.when('/list', {
			templateUrl: 'pages/list.html',
			controller: 'ListController',
			controllerAs: 'vm'
		})
		
		.when('/add', {
			templateUrl: 'pages/add.html',
			controller: 'AddController',
			controllerAs: 'vm'
		})
		
		.when('/edit/:id', {
			templateUrl: 'pages/edit.html',
			controller: 'EditController',
			controllerAs: 'vm'
		})
		
		.when('/delete/:id', {
			templateUrl: 'pages/delete.html',
			controller: 'DeleteController',
			controllerAs: 'vm'
		})

		.when('/login', {
			templateUrl: 'pages/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		
		.when('/register'. {
			templateUrl: 'pages/register.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		})
		
		.otherwise({redirectTo: '/'});
	}
);

/* REST Web API functions */
function createBlog($http, data) {
	return $http.post('/api/blogs', data, {headers: {Authorization: 'Bearer ' + authentication.getToken() }});
 
}

function getBlogList($http) {
	return $http.get('/api/blogs'); 
}

function getBlogById($http, id) {
	return $http.get('/api/blogs/' + id); 
}

function updateBlogById($http, id, data) {
	return $http.put('/api/blogs/' + id, data, {headers: {Authorization: 'Bearer ' + authentication.getToken() }});
}

function deleteBlogById($http, id) {
	return $http.delete('/api/blogs/' + id, {headers: {Authorization: 'Bearer ' + authentication.getToken() }});

}

/** Controllers **/
app.controller('IndexController', function IndexController() {
	var vm = this;
	vm.pageHeader = {
		title: "My Blog"
	};
	vm.message = "Welcome to Chase Curtis's blog site!";
});

// CREATE
app.controller('AddController', [ '$http', '$location', function AddController($http, $location) {
	var vm = this;
	vm.blog = {};
	vm.pageHeader = {
		title: "Add Blog"
	};
	
	// Define ViewModel's function, submit, does with data in form 
	vm.submit = function () {
		var data = vm.blog;
		data.blogTitle = addForm.blogTitle.value;
		data.blogAuthor = addForm.blogAuthor.value;
		data.blogText = addForm.blogText.value;
	
		createBlog($http, data).success(function(data) {
			vm.message = "Blog create successfully!";
			$location.path('/list').replace();
		}).error(function (e) {
			vm.message = "Could not add blog: " + addForm.blogTitle.text + " " + addForm.blogText.text;
		});
	}
}]);

// READ
app.controller('ListController', [ '$http', function ListController($http) {
	var vm = this;
	vm.foo = "hi testing";
	vm.pageHeader = {
		title: "Blog List"
	};
	getBlogList($http).success(function(data) {
		vm.blogs = data;
		vm.message = "Blog(s) found!";
		}).error(function (e) {
		vm.message = "Could not fetch list of blogs.";
	});
}]);

// UPDATE
app.controller('EditController', [ '$http', '$routeParams', '$location', function EditController($http, $routeParams, $location) {
	var vm = this;
	// Start w/ blank blog
	vm.blog = {};
	// Get id from $routeParams which is injected & passed into ctrller
	vm.id = $routeParams.id;
	vm.pageHeader = {
		title: "Edit Blog"
	};
	
	// Fetch blog data to display on edit page
	getBlogById($http, vm.id).success(function(data) {
		vm.blog = data;
	}).error(function (e) {
		vm.message = "Could not fetch blog with given id: " + vm.id;
	});
	
	// Define ViewModel's function, submit, does with data in form 
	vm.submit = function () {
		var data = {};
		data.blogTitle = editForm.blogTitle.value;
		data.blogAuthor = editForm.blogAuthor.value;
		data.blogText = editForm.blogText.value;
	
		updateBlogById($http, vm.id, data).success(function(data) 		{
			vm.message = "Blog data updated!";
			// State Provider
			$location.path('/list').replace();
		}).error(function (e) {
			vm.message = "Could not update blog with given id: " + vm.id;
		});
	}
}]); 

// DELETE
app.controller('DeleteController', [ '$http', '$routeParams', '$location', function DeleteController($http, $routeParams, $location) {
	var vm = this;
	vm.blog = {};
	vm.id = $routeParams.id;
	vm.pageHeader = {
		title: "Delete Blog"
	};
	
	getBlogById($http, vm.id).success(function(data) {
		vm.blog = data;
		vm.message = "Blog data found!";
	}).error(function (e) {
		vm.message = "Could not fetch blog with given id: " + vm.id;
	});

	vm.submit = function () {
		deleteBlogById($http, vm.id).success(function(data) {
			vm.message = "Blog deleted!";
			$location.path('/list').replace();
		}).error(function (e) {
			vm.message = "Could not delete blog with given id: " + vm.id;
		});
	}
}]);
