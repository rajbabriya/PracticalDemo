import { BASE_URL } from '../../Constants';

export const getAllCategories = (languageid, customerid) => {
  return (dispatch) => {
    fetch(BASE_URL + `/GetAllCategories?languageid=${languageid}&customerid=${customerid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!!data.Categories) {
          dispatch({
            type: 'ADD_CATEGORIES',
            categories: data.Categories,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
