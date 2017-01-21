import { LOGIN_USER } from '../actions/loginUserAction';
import { LOGOUT_USER } from '../actions/logoutUserAction';
import { AUTHORIZE_USER } from '../actions/authorizeUserAction';

export default function(state = false, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload.data.data.user;
        case AUTHORIZE_USER:
            return action.payload.data.user ? action.payload.data.user : state;
        case LOGOUT_USER:
            return null;
    }
    return state;
}
