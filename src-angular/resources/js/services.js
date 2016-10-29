quickJSApp.service("signupValidation", function() {
    this.validateUsername = function(username, errorMessage) {
        if (username.length < 5)
            errorMessage.username = "Please enter a valid username, username should be atleast 5 characters";
        else
            errorMessage.username = "";
    }
    this.validatePassword = function(password, errorMessage) {
        if (password.length < 5)
            errorMessage.password = "Please enter a valid password, password should be atleast 5 characters";
        else
            errorMessage.password = "";
    }
});
