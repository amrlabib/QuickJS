quickJSApp.directive("user", function() {
    return {
        restrict: "E",
        templateUrl: "resources/js/directives/user.html",
        replace: true,
        scope: {
            user: "=",
            deleteUser: "&"
        }
    }
});
