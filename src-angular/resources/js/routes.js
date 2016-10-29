quickJSApp.config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: "resources/js/views/home.html",
            controller: "homeController"
        }).when('/login', {
            templateUrl: "resources/js/views/login.html",
            controller: "loginController"
        })
        .when('/signup', {
            templateUrl: "resources/js/views/signup.html",
            controller: "signupController"
        })
});
