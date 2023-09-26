export const startLoader = () => dispatch => {
    dispatch({
        type : "API_START_LOADER",
        payload : []
    })
}
export const stopLoader = () => dispatch => {
    console.log("inStopLoader")
    dispatch({
        type : "API_STOP_LOADER",
        payload : []
    })
}