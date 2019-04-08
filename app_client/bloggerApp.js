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
			controller: 'vm'
		})
		
		.otherwise({redirectTo: '/'});
	});

/* Controllers */
app.controller('HomeController', function HomeController() {
	var vm = this;
	vm.pageHeader = {
		title: "My Blog"
	};
	vm.message = "Welcome to my site!";
});

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

app.controller('AddController', function AddController() {
	var vm = this;
	vm.pageHeader = {
		title: "Add Blog"
	};
	vm.message = "Add a Blog";
});

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
		vm.message = "Could not get book given id of " + vm.id;
	});
	
	// Define what VM's function, submit, does with data in form 
	//vm.submit 
