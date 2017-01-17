import axios from 'axios';

const API = "http://localhost:5000/api/users/login";
export const LOGIN_USER = 'LOGIN_USER';

export function login(props)
{
	const request = axios.post(API , props);
	return {
		type: LOGIN_USER,
		payload: request
	}
}