import React , {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component{
	render()
	{
		if(this.props.userDetails == null)
			return <div>Please select a user</div>

		return (
			<div>
				<h3>Details:</h3>
				<div>{ this.props.userDetails.username }</div>
				<div>{ this.props.userDetails.password }</div>
			</div>
			)
	}
}

function mapStateToProps(state)
{
	return {
		userDetails : state.activeUser
	};
}

export default connect(mapStateToProps)(UserDetail);