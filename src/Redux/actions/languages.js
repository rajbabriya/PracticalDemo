import { BASE_URL } from '../../Constants';

export const getAllLanguages = () => {
  return (dispatch) => {
    fetch(BASE_URL + '/GetAllLanguages')
      .then((res) => res.json())
      .then((data) => {
        if (!!data.Languages) {
          dispatch({
            type: 'ADD_LANGUAGES',
            languages: data.Languages,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setLanguage = (language) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_SELECTED_LANGUAGE',
            language: language,
          });
    }
}
