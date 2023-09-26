import { TEMPLATES, FETCH_FUNCTIONS, GET_SUCCESS, GET_ERRORS, FETCH_PHASES, SAVE_FUNCTION, SAVE_PHASE, CREATE_TEMPLATE, TEMPLATE_STYLES, GET_TEMPLATE, UPDATE_TEMPLATE, SAVE_TEMPLATE_DATA, DUPLICATE_TEMPLATE, DELETE_TEMPLATE } from './types';

import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');

export const fetchTemplates = (templates) => dispatch => {
    if(templates.status === 200) {
        dispatch({
            type: TEMPLATES,
            payload: templates.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: templates.data.data
        })
    }
}

export const fetchFunctions = (functions) => dispatch => {
    if(functions.status === 200) {
        dispatch({
            type: FETCH_FUNCTIONS,
            payload: functions.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: functions.data.data
        })
    }
}

export const fetchPhases = (phases) => dispatch => {
    if(phases.status === 200) {
        dispatch({
            type: FETCH_PHASES,
            payload: phases.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: phases.data.data
        })
    }
}

/* Action: Changed saveStyle function
By: Syed On: 2/28/2020 */

export const saveFunction = (functions) => dispatch => {
    if(functions.status === 200) {
        responseMessage("success", "Function saved successfully!", "");
        dispatch({
            type: SAVE_FUNCTION,
            payload: functions.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: functions.data.data
        })
    }
}

export const savePhase = (phases) => dispatch => {
    if(phases.status === 200) {
        responseMessage("success", "Phase saved successfully!", "");
        dispatch({
            type: SAVE_PHASE,
            payload: phases.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: phases.data.data
        })
    }
}

export const createTemplate = (template) => dispatch => {
    if(template.status === 200) {
        dispatch({
            type: CREATE_TEMPLATE,
            payload: template.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: template.data.data
        })
    }
}

export const fetchTemplateStyles = (templates) => dispatch => {
    if(templates.status === 200) {
        dispatch({
            type: TEMPLATE_STYLES,
            payload: templates.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: templates.data.data
        })
    }
}

export const getTemplate = (template) => dispatch => {
    if(template.status === 200) {
        dispatch({
            type: GET_TEMPLATE,
            payload: template.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: template.data.data
        })
    }
}

export const updateTemplate = (template) => dispatch => {
    if(template.status === 200) {
        dispatch({
            type: UPDATE_TEMPLATE,
            payload: template.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: template.data.data
        })
    }
}

export const saveData = (template) => dispatch => {
    if(template.status === 200) {
        dispatch({
            type: SAVE_TEMPLATE_DATA,
            payload: template.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: template.data.data
        })
    }
}

export const duplicateTemplate = (template) => dispatch => {
    if(template.status === 200) {
        dispatch({
            type: DUPLICATE_TEMPLATE,
            payload: template.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: template.data.data
        })
    }
}

export const deleteTemplate = (template) => dispatch => {
    if(template.status === 200) {
        dispatch({
            type: DELETE_TEMPLATE,
            payload: template.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: template.data.data
        })
    }
}