import { FETCH_OWNERS, FETCH_TASKS  } from './types';
const config = require('../config');

export const setFetchOwners = (data) => {
    return {
        type: FETCH_OWNERS,
		payload: data.data
    }
}

export const setFetchTasks = (data) => {
    return {
        type: FETCH_TASKS,
		payload: data.data
    }
}