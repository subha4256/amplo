import Axios from "axios";
import config from "../../../config";
import { responseMessage } from "../../../utils/alert";
import CacheStorage from "../../../utils/CacheStorage";

export const fetchFunctions = async (projectId) => {
    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    let functions = await Axios.get(
        config.laravelBaseUrl +
            "get_decomposition_function_project/" +
            projectId +
            "/" +
            0,
        {
            headers: headers,
        }
    );
    return functions.data.data;
};

export const fetchPhases = async (projectId) => {
    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    let functions = await Axios.get(
        config.laravelBaseUrl +
            "get_decomposition_phase_project/" +
            projectId +
            "/" +
            0,
        {
            headers: headers,
        }
    );
    return functions.data.data;
};

export const fetchInnerProcess = async (projectId) => {
    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    let functions = await Axios.get(
        config.laravelBaseUrl +
            "get_decomposition_level_one_activities/" +
            projectId +
            "/" +
            0,
        {
            headers: headers,
        }
    );
    return functions.data.data;
};

function convert_to_new(obj) {
    let new_obj = {};
    new_obj.success = obj.success;
    let new_array = [];
    obj.data.map((item) => {
        item.Data.map((sub) => {
            sub.CausalName = item.CausalName;
            new_array.push(sub);
        });
    });
    new_obj.data = new_array;
    return new_obj;
}

export const getCausalDetails = async (projectId) => {
    // GetDependentDetailbyDecompositionProcessLevelID

    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    let functions = await Axios.get(
        config.laravelBaseUrl +
            "GetDependentDetailbyDecompositionProcessLevelID/" +
            projectId +
            "/0",
        {
            headers: headers,
        }
    );

    let change = functions.data.data.reduce((acc, curr) => {
        let obj = curr.Data.map((item) => item);

        return [...acc, obj].flat();
    }, []);
    console.log(change);

    if (functions.data.data) {
        return change;
    }
};

export const deleteCausal = async (projectId, processId, masterId) => {
    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    let functions = await Axios.get(
        config.laravelBaseUrl +
            "DeleteDependentMaster/" +
            0 +
            "/" +
            0 +
            "/" +
            masterId,
        {
            headers: headers,
        }
    );
    return functions.data;
};

export const deleteIndependentCausal = async (
    projectId,
    processId,
    masterId
) => {
    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    let functions = await Axios.get(
        config.laravelBaseUrl +
            "DeleteDependentDetail/" +
            0 +
            "/" +
            processId +
            "/" +
            masterId,
        {
            headers: headers,
        }
    );
    return functions.data;
};

export const postCausalList = (data, hideMethod) => {
    const headers = {
        authorization: "Bearer " + CacheStorage.getItem("userToken"),
    };
    Axios.post(config.laravelBaseUrl + "CheckCircularDependency", data, {
        headers: headers,
    })
        .then((res) => {
            if (res?.data?.data?.Success == 1) {
              

                Axios.post(
                    config.laravelBaseUrl + "SaveDependentDetail",
                    data,
                    {
                        headers: headers,
                    }
                )
                    .then((result) => {
                        console.log(result);
                        responseMessage(
                            "success",
                            "Details Saved Successfully!"
                        );

                        hideMethod();
                    })
                    .catch((err) => console.log(err));
            } else {
                responseMessage("error", "Please remove circular reference!");
            }
        })
        .catch((err) => console.log(err));
};
