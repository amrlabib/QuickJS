// Reducer is a function that will return application state
import {FETCH_USERS} from '../actions/fetchUsersAction';

export default function(state = null, action) {
    switch(action.type)
    {
    	case FETCH_USERS : return action.payload;
    }
    return state;
}
