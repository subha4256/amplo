import { SEARCH_PROCESS } from './types';


export const setSrchAray = (srchArray) => dispatch => {
    dispatch({
        type: SEARCH_PROCESS,
        payload: srchArray
    })
};