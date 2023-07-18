import { BASE_URL } from '../../Constants';

export const getAllDeals = (languageid, customerid) => {
  return (dispatch) => {
    fetch(BASE_URL + `/GetAllMerchantDeals?languageid=${languageid}&customerid=${customerid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!!data.Deals) {
          dispatch({
            type: 'ADD_DEALS',
            deals: data.Deals,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
