import axios from 'axios';

const API = "http://localhost:5000/api/users/";
export const FETCH_USERS = 'FETCH_USERS';

export function fetchUsers()
{
	const request = axios.get(API);
	return {
		type: FETCH_USERS,
		payload: request
	}
}