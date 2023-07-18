const initialState = {
    users: [],
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_USERS':
        return {
          ...state,
          users: action.users,
        };
      default:
        return state;
    }
  };
  
  export default usersReducer;
  