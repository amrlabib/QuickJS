import axios from 'axios';

const API = "http://localhost:5000/api/users/authorize";
export const AUTHORIZE_USER = 'AUTHORIZE_USER';

export function authorize()
{
	const request = axios.get(API);
	return {
		type: AUTHORIZE_USER,
		payload: request
	}
}