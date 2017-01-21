import { LOGIN_USER } from '../actions/loginUserAction';
import { LOGOUT_USER } from '../actions/logoutUserAction';

export default function(state = false, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload.data.data.user;
        case LOGOUT_USER:
            return null;
    }
    return state;
}
