import axios from 'axios';

const API = "http://localhost:5000/api/users/delete";
export const SIGNUP = 'SIGNUP';

export function signup(userId)
{

	const request = axios.get(API);
	return {
		type: SIGNUP,
		payload: request
	}
}