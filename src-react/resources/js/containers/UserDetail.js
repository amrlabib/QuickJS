import React , {Component} from 'react';
import {connect} from 'react-redux';
import  {userDetail} from '../actions/usersDetailAction';

class UserDetail extends Component{

	componentWillMount()
	{
		this.props.userDetail(this.props.params.id);
	}

	render()
	{
		if(this.props.user == null)
			return <div>Cant find user details</div>
		return (
			<section className="home">
				<div>
					<h3>Details:</h3>
					<ul className="list-group">
						<li className="list-group-item">Username: { this.props.user.username }</li>
						<li className="list-group-item">Password: { this.props.user.password }</li>
						<li className="list-group-item">Email: { this.props.user.email }</li>
					</ul>
				</div>
			</section>
			)
	}
}

function mapStateToProps(state)
{
	return {
		user : state.users.userDetail
	};
}



export default connect(mapStateToProps , {userDetail} )(UserDetail);