export function selectUser(user) {
	console.log("inside action!");
    return {
    	type : 'USER_SELECTED',
    	payload: user
    }
}
