import axios from 'axios';

const API = "http://localhost:5000/api/users/";
export const USER_DETAIL = 'USER_DETAIL';

export function userDetail(id) {
    const request = axios.get(API + id);
    return {
        type: USER_DETAIL,
        payload: request
    }
}
