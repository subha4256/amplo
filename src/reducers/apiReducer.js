import { API_START, API_END, ACCESS_DENIED, API_ERROR, API_SUCCESS } from "../actions/types/api";
import {APIAlert, responseMessage} from '../utils/alert';


const initialState = {
	isLoadingData: false,
  stack:[],
  data:{}
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case API_START:
        if(action.payload != "FETCH_MENU"){
          return {
            ...state,
            stack: [...state.stack, action.payload],
            isLoadingData: true
          };
        }
      //break;
    case API_END:
        let availableStack = [...state.stack].filter( val => val !== action.payload ); 
        if(action.payload != "FETCH_MENU"){
          return {
            ...state,
            stack: availableStack,
            isLoadingData: (availableStack.length > 0) ? true: false
          };
        }
      //break;

      case ACCESS_DENIED:
        APIAlert(action.payload.url).error();
        return {
          ...state
        };

      case API_ERROR:
        let {name, message, config, pathname, response, methodOfRequest, label} = action.payload;
        let errMsg = message +" - "+ pathname; 
        if(label != 'uploadFiles'){
          if(methodOfRequest === "POST" || methodOfRequest === "post"){
            if(response) responseMessage("error",response.data.message);
          }
        }
        // APIAlert(errMsg).error();
        return {
          ...state
        }

      case API_SUCCESS:
        APIAlert(action.payload).success();
        return {
          ...state
        }

        case "API_START_LOADER":
        return {
          ...state,
          isLoadingData:  true
        };

        case "API_STOP_LOADER":
          return{
            ...state,
            isLoadingData:  false  
          };

    default:
      return state;
  }
}