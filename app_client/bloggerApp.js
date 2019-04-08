var app = angular.module('bloggerApp', [ngRoute]);

/* Router Provider */
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
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
		
		.when('/edit/:id' {
			templateUrl: 'pages/edit.html',
			controller: 'EditController',
			controllerAs: 'vm'
		})
		
		.when('/delete/:id', {
			templateUrl: 'pages/delete.html',
			controller: 'DeleteController',
			controllerAs: 'vm"
		})

		.otherwise({redirectTo: '/'});
	});

/* REST Web API functions */
function createBlog($http) {
	return $http.post('/api/blogs', data); 
}

function getBlogList($http) {
	return $http.get('/api/blogs'); 
}

function getBlogById($http, id) {
	return $http.get('/api/blogs/' + id); 
}

function updateBlogById($http, id, data) {
	return $http.put('/api/blogs/' + id, data);
}

function deleteBlogById($http, id) {
	return $http.delete('/api/blogs/' + id);
}

/** Controllers **/
app.controller('HomeController', function HomeController() {
	var vm = this;
	vm.pageHeader = {
		title: "My Blog"
	};
	vm.message = "Welcome to Chase Curtis's blog site!";
});

// CREATE
app.controller('AddController', [ '$http', '$location', function AddController() {
	var vm = this;
	vm.blog = {};
	vm.pageHeader = {
		title: "Add Blog"
	};
	
	// Define ViewModel's function, submit, does with data in form 
	vm.submit = function () {
		var data = vm.blog;
		data.blogTitle = userForm.blogTitle.value;
		data.blogAuthor = userForm.blogAuthor.value;
		data.blogText = userForm.blogText.value;
	
		createBlog($http, data).success(function(data) {
			vm.message = "Blog create successfully!";
			$location.path('/list').replace();
		}).error(function (e) {
			vm.message = "Could not add blog: " + addForm.blogTitle.text + " " + addForm.blogText.text;
		});
	}
});

// READ
app.controller('ListController', function ListController($http) {
	var vm = this;
	vm.pageHeader = {
		title: "Blog List"
	};
	getBlogList($http).success(function(data) {
		vm.blogs = data;
		vm.message = "Blog(s) found!";
		}).error(function (e) {
		vm.message = "Could not fetch list of blogs.";
	});
});

// UPDATE
app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
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
		vm.message = "Blog data found!";
	}).error(function (e) {
		vm.message = "Could not fetch blog with given id: " + vm.id;
	});
	
	// Define ViewModel's function, submit, does with data in form 
	vm.submit = function () {
		var data = vm.blog;
		data.blogTitle = userForm.blogTitle.value;
		data.blogAuthor = userForm.blogAuthor.value;
		data.blogText = userForm.blogText.value;
	
		updateBlogById($http, vm.id, data).success(function(data) {
			vm.message = "Blog data updated!";
			// State Provider
			$state.go('list');
		}).error(function (e) {
			vm.message = "Could not update blog with given id: " + vm.id;
		});
	}
}]); 

// DELETE
app.Controller('DeleteController', [ '$http', '$routeParams', '$state', function DeleteController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {};
	vm.id = $routeParams.id;
	vm.pageHeader = {
		title: "Delete Blog"
	};
	
	getBlogById($http, vm.id).success(function(data) {
		vm.blog = data;
		vm.message "Blog data found!";
	}).error(function (e) {
		vm.message = "Could not fetch blog with given id: " + vm.id;
	});

	vm.submit = function () {
		deleteBlogById($http, vm.id).success(function(data) {
			vm.message = "Blog deleted!";
			$location.path('list').replace();
		}).error(function (e) {
			vm.message = "Could not delete blog with given id: " + vm.id;
		});
	}
}];
