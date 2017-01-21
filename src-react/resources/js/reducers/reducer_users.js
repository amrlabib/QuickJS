// Reducer is a function that will return application state
import { FETCH_USERS } from '../actions/fetchUsersAction';
import { DELETE_USER } from '../actions/deleteUserAction';
import { LOGOUT_USER } from '../actions/logoutUserAction';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload.data;
        case DELETE_USER:
            return state.filter(user => user._id !== action.payload.data._id);
            break;
        case LOGOUT_USER:
            return null;
    }
    return state;
}
