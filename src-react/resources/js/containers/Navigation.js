import React , { Component } from "react";
import { connect } from 'react-redux';
import { logout } from  '../actions/logoutUserAction';
import { authorize } from  '../actions/authorizeUserAction';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class Navigation extends Component
{
	constructor(props) {
        super(props);
    }

    componentWillMount()
    {
    	this.props.authorize().catch(function(err){
    		browserHistory.push('/login');
    	});
    }

	handleLogoutUser()
	{
		this.props.logout().then(function(result){
			browserHistory.push('/login');
		});
	}

	render()
	{
		const user = this.props.user ?  <span className="logged-user" onClick={this.handleLogoutUser.bind(this)}>{"Logout "  + this.props.user.username }</span> : "";
		return (
			<header>
		        <nav className="navbar navbar-default">
		            <div className="navbar-header">
		                <a className="navbar-brand" href="#">Quick React</a>
		            </div>
		            <div id="navbar" className="navbar-collapse collapse">
		                <ul className="nav navbar-nav">
		                    <li><Link to="/">Home</Link></li>
		                    <li><Link to="/Login">Login</Link></li>
		                    <li><Link to="/Signup">Signup</Link></li>
		                </ul>
		                {user}
		            </div>
		        </nav>
		    </header>
    	)
	}
}

function mapStateToProps(state)
{
	return {
		user : state.user
	}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout : logout  , authorize : authorize}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);



