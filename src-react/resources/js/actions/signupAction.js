import axios from 'axios';

const API = "http://localhost:5000/api/users/signup";
export const SIGNUP = 'SIGNUP';

export function signup(props) {
    const request = axios.post(API, props);
    return {
        type: SIGNUP,
        payload: request
    }
}
