const initialState = {
    deals: [],
  };
  
  const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_DEALS':
        return {
          ...state,
          deals: action.deals,
        };
      default:
        return state;
    }
  };
  
  export default dealsReducer;
  