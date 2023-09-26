import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReportsBody from "./ReportsBody";
import Header from "../Header/Header";
import config from "../../../config";
import domtoimage from "dom-to-image";

const BusinessReports = () => {
    const { id } = useParams();
    const [fetchData, setFetchData] = useState({});

    useEffect(() => {
        Axios.get(`${config.laravelBaseUrl}getClientBenchmarkResponses/${id}`, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
            .then((res) => {
                console.log("RES =>", res);
                setFetchData(res.data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <div id="divToPrint" className="mt4">
                <Header
                    data={fetchData}
                    domId={"divToPrint"}
                    title={"Businees Discovery Report"}
                />
                <ReportsBody
                    data={fetchData && fetchData?.domain_with_questions}
                />
            </div>
        </div>
    );
};

export default BusinessReports;
