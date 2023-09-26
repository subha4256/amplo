import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../../config";
import Header from "../Header/Header";
import PerformanceGraphs from "./PerformanceGraphs";

const PerformanceBody = () => {
    const [fetchData, setFetchData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        Axios.get(
            `${config.laravelBaseUrl}getClientPerformanceSummary/${id}`,
            {
                headers: {
                    authorization:
                        "Bearer " + sessionStorage.getItem("userToken"),
                },
            }
        )
            .then((res) => {
                console.log("RES =>", res);
                setFetchData(res.data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(fetchData);

    return (
        <div id="performace_reports">
            <Header data={fetchData} domId="performace_reports"/>
            <PerformanceGraphs data={fetchData} />
          
        </div>
    );
};

export default PerformanceBody;
