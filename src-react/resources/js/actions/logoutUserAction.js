import axios from 'axios';

const API = "http://localhost:5000/api/users/logout";
export const LOGOUT_USER = 'LOGOUT_USER';

export function logout()
{
	const request = axios.get(API);
	return {
		type: LOGOUT_USER,
		payload: request
	}
}