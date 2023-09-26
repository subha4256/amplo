import { FETCH_MENU } from "./types";
import { apiAction } from './apiActions';
const config = require("../config");


export const fetchMenu = (extraparam) => {
   return apiAction({
    url: config.laravelBaseUrl + "fetch-menus/" + extraparam.id,
    onSuccess: setfetchMenu,
    onFailure: () => console.log("Error occured fetchMenu"),
    label: FETCH_MENU
  });
}

function setfetchMenu(data) {
  return {
    type: FETCH_MENU,
    payload: data.data
  };
}




