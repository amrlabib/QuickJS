import React , { Component , PropTypes } from 'react';
import {reduxForm , reset} from 'redux-form';
import {signup}  from '../actions/signupUserAction';
import  {Router} from 'react-router';
import { browserHistory } from 'react-router';



class Signup extends Component
{
	static contextTypes  = {
		router : PropTypes.object
	}

	constructor(props)
	{
		super(props);
	}

	handleSignup(props)
	{
		//const currentUser = { username : this.props.fields.username.value , password : this.props.fields.password.value }
		this.props.signup(props).then(function(result) {
            //browserHistory.push('/');
            this.context.router.push('/');
        }.bind(this));
	}

	render()
	{
		const { fields : {username , email , password , passwordConfirmation} , handleSubmit } = this.props;
		return (
			<section>
				<form onSubmit={handleSubmit(this.handleSignup.bind(this))}  >
					<h3>Signup</h3>
					<div className={`form-group ${username.touched && username.invalid ? 'has-danger' : '' }`}>
						<label>Username:</label>
						<input type="text"  className="form-control"  value={username.value} {...username} />
						<div className="text-help">
							{username.touched ? username.error : ""}
						</div>
					</div>
					<div className={`form-group ${email.touched && email.invalid ? 'has-danger' : '' }`}>
						<label>Email:</label>
						<input type="text"  className="form-control"  value={email.value} {...email} />
						<div className="text-help">
							{email.touched ? email.error : ""}
						</div>
					</div>
					<div className={`form-group ${password.touched && password.invalid ? 'has-danger' : '' }`}>
						<label>Password:</label>
						<input type="password"  className="form-control" value={password.value}  {...password}/>
						<div className="text-help">
							{password.touched ? password.error : ""}
						</div>
					</div>
					<div className={`form-group ${passwordConfirmation.touched && passwordConfirmation.invalid ? 'has-danger' : '' }`}>
						<label>Password Confirmation:</label>
						<input type="password" className="form-control" value={passwordConfirmation.value}  {...passwordConfirmation}/>
						<div className="text-help">
							{passwordConfirmation.touched ? passwordConfirmation.error : ""}
						</div>
					</div>
					<button type="submit" className="btn btn-primary" >Submit</button>
				</form>
			</section>
			)
	}
}


//if the validation function returned a key which is the same as one of the keys that exist in redux form, the form will be marked as invalid
function validate(values)
{
	const errors = {};

	if(!values.email || values.email.length < 3)
		errors.email = "Enter Valid Email";

	if(!values.username || values.username.length < 3)
		errors.username = "Enter Username";

	if(!values.password || values.password.length < 3)
		errors.password = "Invalid Password";

	if(!values.passwordConfirmation || values.password != values.passwordConfirmation)
		errors.passwordConfirmation = "Passwords doesn't match";

	return errors;	
}

// in connect 1st argument is mapStateToProps , 2nd is mapDispatchToProps
// in reduxForm 1st argument is form configurations, 2nd is mapStateToProps, and 3rd is mapDispatchToProps

export default reduxForm({
	form: 'SignupForm',
	fields : [ 'username' , 'email' ,'password' , 'passwordConfirmation' ],
	validate
} , null , {signup} )(Signup)

