exports.Email = {
	API_KEY : "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",
    sendEmail: function(user) {
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('info@quickjs.com');
        var to_email = new helper.Email('amr@prototype.net');
        var subject = 'Quick JS User Signup';
        var content = new helper.Content('text/html', '<h3>User: ' + user.username + ' successfully signed up</h3>');
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(this.API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });
    }
}
