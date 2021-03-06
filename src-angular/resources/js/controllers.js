quickJSApp.controller('mainController', ['$scope', '$location', function($scope, $location) {
    $scope.page = $location.path();
    $scope.$on("$routeChangeSuccess", function() {
        $scope.page = $location.path();
    });
}]);

quickJSApp.controller('homeController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http.get("http://127.0.0.1:5000/api/users").success(function(result) {
        $scope.usersList = result;
    }).error(function(data, status) {
        console.log("error while getting users list");
    });

    $scope.deleteUser = function(userID) {
        $http.get("http://127.0.0.1:5000/api/users/delete/" + userID).success(function(result) {

            var currentIndex = 0;
            $scope.usersList.forEach(function(user) {
                if (user._id == userID) {
                    console.log(currentIndex);
                    $scope.usersList.splice(currentIndex, 1);
                    return;
                }
                currentIndex++;
            });

        }).error(function(data, status) {
            console.log("error while deleting user from database");
        });
    }
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
        if (signupValidation.validateUsername($scope.username, $scope.errorMessage) && signupValidation.validatePassword($scope.password, $scope.errorMessage))
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
