import { SAVE_TEMPLATE_DECOMPOSITION, TEMPLATE_PROCESSES, GET_ERRORS } from './types';
import { apiAction } from './apiActions';
const config = require('../config');

/* Action: Changed fetchProcessData function
By: Syed On: 2/28/2020 */

export const fetchProcessData = (options) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_template_tree_view/'+options.templateId+'/'+options.processId , 
        onSuccess: setfetchProcessData,
        onFailure: () => console.log("Error occured in fetchProcessData"),
        label: TEMPLATE_PROCESSES
      });
}

function setfetchProcessData(data){
    return {
        type: TEMPLATE_PROCESSES,
		payload: data.data
    }
}


export const saveTemplateDecompositionData = (cmObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'update_decomposition_levels_template_data', 
        method: "POST",
        data: cmObj,
        onSuccess: setSaveTemplateDecompositionData,
        onFailure: () => console.log("Error occured in fetchProcessData"),
        label: SAVE_TEMPLATE_DECOMPOSITION
      });
}

function setSaveTemplateDecompositionData(data){
    return {
        type: SAVE_TEMPLATE_DECOMPOSITION,
		payload: data.data
    }
}
