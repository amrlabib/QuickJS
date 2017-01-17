import React , { Component } from 'react';
import {reduxForm} from 'redux-form';
import {login}  from '../actions/loginAction';


class Login extends Component
{
	constructor(props)
	{
		super(props);
	}


	render()
	{
		const { fields : {username , password } , handleSubmit } = this.props;
		return (
			<section>
				<form onSubmit={handleSubmit(this.props.login)} >
					<h3>Login</h3>
					<div className={`form-group ${username.touched && username.invalid ? 'has-danger' : '' }`}>
						<label>Username:</label>
						<input type="text"  className="form-control"  {...username} />
						<div className="text-help">
							{username.touched ? username.error : ""}
						</div>
					</div>
					<div className={`form-group ${password.touched && password.invalid ? 'has-danger' : '' }`}>
						<label>Password:</label>
						<input type="password"  className="form-control"  {...password}/>
						<div className="text-help">
							{password.touched ? password.error : ""}
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

	if(!values.username || values.username.length < 3)
		errors.username = "Enter Username";

	if(!values.password || values.password.length < 3)
		errors.password = "Invalid Password";

	return errors;	
}

// in connect 1st argument is mapStateToProps , 2nd is mapDispatchToProps
// in reduxForm 1st argument is form configurations, 2nd is mapStateToProps, and 3rd is mapDispatchToProps

export default reduxForm({
	form: 'LoginForm',
	fields : [ 'username' , 'password' ],
	validate
} , null , {login} )(Login)

