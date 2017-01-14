//State argument is not application state its only the state this reducer responsible for
//The default of state is null, to avoid redux error in case of the first application load when no user us selected
export default function(state = null, action) {
	switch(action.type)
	{
		case 'USER_SELECTED': return action.payload;
	}
	return state;
}
