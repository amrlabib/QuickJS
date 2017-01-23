// Reducer is a function that will return application state
import { FETCH_USERS } from '../actions/fetchUsersAction';
import { DELETE_USER } from '../actions/deleteUserAction';
import { LOGOUT_USER } from '../actions/logoutUserAction';
import { USER_DETAIL } from '../actions/usersDetailAction';

const INITIAL_STATE = { list : [] , userDetail : null};

export default function(state = INITIAL_STATE, action) {
    console.log("payload from users reducer");
    console.log(action.payload);
    switch (action.type) {
        case FETCH_USERS:
            return {...state , list: action.payload.data};
        case DELETE_USER:
            return {...state , list: state.list.filter(user => user._id !== action.payload.data._id) };
        case USER_DETAIL:
            return {...state , userDetail: action.payload.data.user };
        case LOGOUT_USER:
            return INITIAL_STATE;
    }
    return state;
}
