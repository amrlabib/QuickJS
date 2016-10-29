quickJSApp.controller('mainController', ['$scope', '$location', function($scope, $location) {
    $scope.page = $location.path();
    $scope.$on("$routeChangeSuccess", function() {
        $scope.page = $location.path();
    });
}]);

quickJSApp.controller('homeController', ['$scope', function($scope) {

}]);


quickJSApp.controller('loginController', ['$scope', function($scope) {

}]);


quickJSApp.controller('signupController', ['$scope', '$http', '$location', 'signupValidation', function($scope, $http, $location, signupValidation) {
    $scope.username = "";
    $scope.password = "";
    $scope.errorMessage = { "username": "", "password": "" };


    $scope.validateUsername = function() {
        signupValidation.validateUsername($scope.username, $scope.errorMessage);
    }
    $scope.validatePassword = function() {
        signupValidation.validatePassword($scope.password, $scope.errorMessage);
    }

    $scope.submit = function() {
        if ($scope.errorMessage.length == 0)
            $scope.addUser();
    }

    $scope.addUser = function() {
        $http.post("http://127.0.0.1:5000/api/users/signup", { "username": $scope.username, "passowrd": $scope.password }).success(
            function(result) {
                $location.path("/").replace();
            }
        ).error(function(data, status) {
            console.log("error while adding user \n" + data);
        });
    }
}]);
