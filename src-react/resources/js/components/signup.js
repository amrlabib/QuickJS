import React , { Component } from 'react';
import {reduxForm} from 'redux-form';
import {signup}  from '../actions/signupAction';


class Signup extends Component
{
	constructor(props)
	{
		super(props);
		this.myHandler = this.myHandler.bind(this);
	}

	myHandler ()
	{
		console.log(this.props);
		//this.props.signup.apply(this);
	}

	render()
	{
		const { fields : {username , password , passwordConfirmation} , handleSubmit } = this.props;
		return (
			<section>
				<form onSubmit={handleSubmit(this.myHandler)} >
					<h3>Signup</h3>
					<div className="form-group">
						<label>Username:</label>
						<input type="text"  className="form-control"  {...username} />
					</div>
					<div className="form-group">
						<label>Password:</label>
						<input type="password"  className="form-control"  {...password}/>
					</div>
					<div className="form-group">
						<label>Password Confirmation:</label>
						<input type="password" className="form-control"  {...passwordConfirmation}/>
					</div>
					<button type="submit" className="btn btn-primary" >Submit</button>
				</form>
			</section>
			)
	}
}

// in connect 1st argument is mapStateToProps , 2nd is mapDispatchToProps
// in reduxForm 1st argument is form configurations, 2nd is mapStateToProps, and 3rd is mapDispatchToProps

export default reduxForm({
	form: 'SignupForm',
	fields : [ 'username' , 'password' , 'passwordConfirmation' ]
} , null , {signup} )(Signup)

