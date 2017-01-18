import {combineReducers} from 'redux';
import UsersReducer from './reducer_users';
import ActiveUser from  './reducer_active_user';
import {reducer as formReducer} from 'redux-form';

//Maping reducers to state values
const rootReducer = combineReducers({
	users : UsersReducer,
	activeUser: ActiveUser,
	form: formReducer 
});

export default rootReducer;