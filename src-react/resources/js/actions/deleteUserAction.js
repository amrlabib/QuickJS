import axios from 'axios';

const API = "http://localhost:5000/api/users/delete";
export const DELETE_USER = 'DELETE_USER';

export function deleteUser(userId)
{
	const request = axios.get(API + "/"+ userId);
	return {
		type: DELETE_USER,
		payload: request
	}
}