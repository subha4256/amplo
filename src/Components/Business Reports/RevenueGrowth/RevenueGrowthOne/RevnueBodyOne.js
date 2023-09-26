import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../../../config";
import Header from "../../Header/Header";
import Revenue_main from "../RevenueGrowthTwo/Revenue_main";
import Revenue_main_third from "../RevnueGrowthThree/Revenue_main_third";

import Revenue from "./Revenue";

const RevnueBodyOne = () => {
    const { id, year } = useParams();
    const [fetchDataOne, setFetchDataOne] = useState({});
    const [fetchDatatwo, setFetchDatatwo] = useState({});
    const [fetchDatathree, setFetchDatathree] = useState({});

    const fetchFirstdata = (url) => {
        let URL = `${config.laravelBaseUrl}${url}/${id}/${year}`;

        return Axios.get(URL, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        });
    };

    useEffect(() => {
        (async function () {
            try {
                const [firstData, twoData, threeData] = await Promise.all([
                    fetchFirstdata("getClientRevenueGrowthManagement"),
                    fetchFirstdata(
                        "getClientRevenueGrowthManagementDetailsData"
                    ),
                    fetchFirstdata("getClientRevenueGrowthManagementReport"),
                ]);

                // let firstData = await fetchFirstdata(
                //     "getClientRevenueGrowthManagement" , "year"
                // );
                // let twoData = await fetchFirstdata(
                //     "getClientRevenueGrowthManagementDetailsData"
                // );

                // let threeData = await fetchFirstdata(
                //     "getClientRevenueGrowthManagementReport"
                // );

                setFetchDataOne(firstData.data.data);
                setFetchDatatwo(twoData.data.data);
                setFetchDatathree(threeData.data.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    // console.log(fetchDataOne);
    // console.log(fetchDatatwo);
    // console.log(fetchDataOne);

    return (
        <div id="revenue_growth_report">
            <Header
                title={"Revenue First"}
                data={fetchDataOne}
                domId="revenue_growth_report"
            />
            <Revenue data={fetchDataOne} />

            <div className="my-5">
                <Revenue_main data={fetchDatatwo} />
            </div>

            <div className="my-5">
                <Revenue_main_third data={fetchDatathree} />
            </div>
        </div>
    );
};

export default RevnueBodyOne;
