import {combineReducers} from 'redux';
import UsersReducer from './reducer_users';
import UserReducer from  './reducer_user';
import {reducer as formReducer} from 'redux-form';

//Maping reducers to state values
const rootReducer = combineReducers({
	users : UsersReducer,
	user: UserReducer,
	form: formReducer 
});

export default rootReducer;