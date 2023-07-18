const initialState = {
    languages: [],
    selectedLanguage: {}
  };
  
  const languagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_LANGUAGES':
        return {
          ...state,
          languages: action.languages,
        };
      case 'ADD_SELECTED_LANGUAGE':
        return {
          ...state,
          selectedLanguage: action.languages,
        };
      default:
        return state;
    }
  };
  
  export default languagesReducer;
  