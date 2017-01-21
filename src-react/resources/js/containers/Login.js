import React , { Component } from 'react';
import {reduxForm} from 'redux-form';
import {login}  from '../actions/loginUserAction';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Login extends Component
{
	constructor(props)
	{
		super(props);
	}

	componentDidMount() {
		
	}

	handleLogin()
	{
		const userInfo = {username : this.props.fields.username.value , password : this.props.fields.password.value };
		this.props.login(userInfo).then (function (result){
			browserHistory.push('/');
		});
	}

	render()
	{
		const { fields : {username , password } , handleSubmit } = this.props;
		return (
			<section>
				<form onSubmit={handleSubmit(this.handleLogin.bind(this))} >
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

function mapStateToProps(state) {
    //whatever is retured here will be added in the component(container) props
    return {
        user : state.user
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
} , mapStateToProps , {login} )(Login)

