import {combineReducers} from 'redux';
import UsersReducer from './reducer_users'


//Maping reducers to state values
const rootReducer = combineReducers({
	users : UsersReducer
});

export default rootReducer;