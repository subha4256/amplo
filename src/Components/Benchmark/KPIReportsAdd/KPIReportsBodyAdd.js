import Axios from "axios";
import React, { useEffect, useState } from "react";

import config from "../../../config";
import { responseMessage } from "../../../utils/alert";
import CacheStorage from "../../../utils/CacheStorage";
// import Header from "../Header/Header";
// import KPIDahsboardAdd from "./KPIDahsboardAdd";

let inputs = {
    market_indicator: [
        { title: "Market Size", name: "marketSize" },
        { title: "Industry Growth", name: "industryGrowth" },
    ],
    growth: [
        { title: "Revenue", name: "revenue_fy22" },
        {
            title: "Revenue Share From Top Customer",
            name: "revenueShareFromTopCustomer",
        },
        { title: "Revenue Growth", name: "revenueGrowth" },
        { title: "Revenue Growth Target", name: "revenueGrowthTarget" },
        { title: "Market Share", name: "marketShare" },
        { title: "Market Share Target", name: "marketShareTarget" },
        { title: "ECommerce Revenue", name: "eCommerceRevenue" },
        { title: "Ecommerce Revenue Target", name: "ecommerceRevenueTarget" },
    ],
    efficiency: [
        { title: "Roce", name: "roce_fy22" },
        { title: "Roce Target", name: "roceTarget" },
        { title: "Operating Magin Current", name: "operatingMaginCurrent" },
        { title: "Operating Margin Target", name: "operatingMarginTarget" },
        { title: "Attrition", name: "attrition" },
        { title: "Working Capital Cycle", name: "workingCapitalCycle" },
        { title: "Debtto Equity", name: "debttoEquity" },
    ],
};

const KPIReportsBodyAdd = ({ projectId, onHide, name }) => {
    console.log(projectId);

    const [fetchData, setFetchData] = useState([]);
    const [kpiData, setKpiData] = useState({});
    const [financialYear, setFinancialYear] = useState("");

    const fetchFinancialYears = () => {
        return Axios.get(`${config.laravelBaseUrl}getFinancialYear`, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
            .then((res) => {
                console.log("RES =>", res);
                let year = res.data.data.FinancialYear?.at(-1)?.CombinedYear;

                setFinancialYear(year);

                getDataFinancialYear(year);
                // res.data.data.FinancialYear.pop()
                // console.log( )

                setFetchData(res.data.data.FinancialYear);
            })
            .catch((error) => console.log(error));
    };

    const getDataFinancialYear = (fYear) => {
        console.log(projectId);
        console.log(financialYear);
        Axios.get(
            `${config.laravelBaseUrl}getKPIDashboardValueForEdit/${projectId}/${fYear}`,
            {
                headers: {
                    authorization:
                        "Bearer " + sessionStorage.getItem("userToken"),
                },
            }
        )
            .then((res) => {
                console.log("RES =>", res);
                setKpiData(res.data.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchFinancialYears();
    }, []);

    const handleFinancialYear = (e) => {
        let value = e.target.value;

        if (value) {
            getDataFinancialYear(value);
            setFinancialYear(value);
        }
    };

    const handleChange = (e, type, id) => {
        let { name, value } = e.target;

        setKpiData({
            ...kpiData,
            [type]: {
                ...kpiData[type],
                Data: kpiData[type].Data.map((item) => {
                    if (item.KPIDashboardSubCategoryId === id) {
                        return { ...item, Value: value };
                    }
                    return item;
                }),
            },
        });
    };

    const handleSubmit = () => {
        let JsonData = [
            ...kpiData.Market_Indicator.Data,
            ...kpiData.Growth_KPIs.Data,
            ...kpiData.Efficiency_KPIs.Data,
        ].map((item) => ({
            KPIDashboardSubCategoryId: item.KPIDashboardSubCategoryId,
            Value: item.Value,
        }));

        const headers = {
            authorization: "Bearer " + CacheStorage.getItem("userToken"),
        };
        Axios.post(
            config.laravelBaseUrl + "SaveUpdateKPIDashBoardDetail",
            {
                Data: JsonData,
                BenchmarkProjectId: projectId,
                FinancialYear: financialYear,
            },
            {
                headers: headers,
            }
        )
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    responseMessage("success", "Save Data Successfully");
                }
                onHide();
            })
            .catch((err) => console.log(err));
    };

    const optons = () => {
        return fetchData?.map((item) => {
            if (item.CombinedYear != financialYear) {
                return (
                    <option key={item.Id} value={item?.CombinedYear}>
                        {item?.CombinedYear}
                    </option>
                );
            }
        });
    };

    return (
        <div id="KPI_dashboard">
            <div className="d-flex justify-content-between ">
                <div>
                    <h4>{name}</h4>
                </div>

                <div>
                    <div class="form-group d-flex">
                        <select
                            onChange={handleFinancialYear}
                            id="inputState"
                            class="form-control"
                        >
                            <option selected>{financialYear}</option>
                            {optons()}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-1">
                <div className="row mx-0 text-center text-white">
                    <div className="col-3">
                        <div className="" style={{ background: "#E76C37" }}>
                            <h2 className="p-2">Market Indicator </h2>
                        </div>
                        {inputs.market_indicator.map((item, index) => (
                            <div
                                className=" text-danger my-2 border border-danger"
                                style={{ background: "#FAE2D7" }}
                            >
                                <h3 className="p-1">{item.title}</h3>
                                {/* Padding change 5 to 3  */}
                                <p className="py-3">
                                    <h1 className="p-4 text-dark">
                                        <div class="form-group ">
                                            <input
                                                value={
                                                    kpiData?.Market_Indicator
                                                        ?.Data[index]?.Value
                                                }
                                                type="number"
                                                class="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                name={item.name}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        "Market_Indicator",
                                                        kpiData
                                                            ?.Market_Indicator
                                                            ?.Data[index]
                                                            ?.KPIDashboardSubCategoryId
                                                    );
                                                }}
                                            />
                                        </div>
                                    </h1>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="col-4">
                        <div className="" style={{ background: "#B3B3B3" }}>
                            <h2 className="p-2 ">Growth KPIs</h2>
                        </div>

                        <div className="row text-dark">
                            {inputs.growth.map((item, index) => (
                                <div className="col-6">
                                    <div
                                        className="mt-1"
                                        style={{ background: "#E6E6E6" }}
                                    >
                                        <p className="p-1 text-break">
                                            {item.title}
                                        </p>
                                        <div class="form-group  mx-1">
                                            <input
                                                value={
                                                    kpiData?.Growth_KPIs?.Data[
                                                        index
                                                    ]?.Value
                                                }
                                                type="number"
                                                class="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                name={item.name}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        "Growth_KPIs",
                                                        kpiData?.Growth_KPIs
                                                            ?.Data[index]
                                                            ?.KPIDashboardSubCategoryId
                                                    );
                                                }}
                                            />
                                        </div>
                                        {item.name != "revenue_fy22" &&
                                            // <p>Benchmark: 00 %</p>
                                            null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="" style={{ background: "#D9B301" }}>
                            <h2 className="p-2 m-0">Efficiency KPIs</h2>
                        </div>

                        <div className="row text-success">
                            {inputs.efficiency.map((item, index) => (
                                <div
                                    className={
                                        item.name == "attrition"
                                            ? "col-12"
                                            : "col-6"
                                    }
                                >
                                    <div
                                        style={{ background: "#F0E199" }}
                                        className=" mt-2 text-dark "
                                    >
                                        <p className="p-1 text-break">
                                            {item.title}
                                        </p>
                                        <div class="form-group mx-1">
                                            <input
                                                value={
                                                    kpiData?.Efficiency_KPIs
                                                        ?.Data[index]?.Value
                                                }
                                                type="number"
                                                class="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                name={item.name}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        "Efficiency_KPIs",
                                                        kpiData?.Efficiency_KPIs
                                                            ?.Data[index]
                                                            ?.KPIDashboardSubCategoryId
                                                    );
                                                }}
                                            />
                                        </div>
                                        <p></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end my-3">
                <button
                    className="btn btn-danger mx-3"
                    onClick={() => onHide()}
                >
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default KPIReportsBodyAdd;
