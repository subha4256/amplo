import { GET_REPORTS_DATA } from "./types"
import axios from 'axios';
import config from "../config";



export const getReportsData = (id) =>{


    console.log(id)

    return (dispatch) => {
        
         axios.get(`${config.laravelBaseUrl}usecase3ReestablishingAFLYScore/${id}`,{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
         }).then((res)=>{

            console.log(res)

                dispatch({
                    type: GET_REPORTS_DATA ,
                    payload:res.data
                })         
         })

    }
}