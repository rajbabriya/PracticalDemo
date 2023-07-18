import { BASE_URL } from '../../Constants';

export const getAllUsers = (languageid) => {
  return (dispatch) => {
    fetch(BASE_URL + `/GetAllCustomers?languageid=${languageid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!!data.Customers) {
          dispatch({
            type: 'ADD_USERS',
            users: data.Customers,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
