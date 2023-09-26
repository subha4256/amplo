import React from "react";
import ReactApexChart from "react-apexcharts";

const Revenue_main = ({ data }) => {
    let graphdata = {
        series: [
            {
                name: "sales",
                data: [
                    {
                        x: data?.RevenueFY21?.KPI,
                        y: data?.RevenueFY21?.RevenueTrend,
                    },
                    {
                        x: data?.RevenueFY22?.KPI,
                        y: data?.RevenueFY22?.RevenueTrend,
                    },
                    {
                        x: data?.RevenueFY25?.KPI,
                        y: data?.RevenueFY25?.RevenueTrend,
                    },
                ],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
                type: "bar",
                height: 380,
            },
            xaxis: {
                type: "category",
                labels: {
                    formatter: function (val) {
                        return "" + val;
                    },
                },
                group: {
                    style: {
                        fontSize: "10px",
                        fontWeight: 700,
                    },
                    groups: [
                        { title: "2019", cols: 4 },
                        { title: "2020", cols: 4 },
                    ],
                },
            },
            dataLabels: {
                enabled: true,

                style: {
                    fontSize: "18px",
                    colors: ["#fff"],
                },
            },

            tooltip: {
                x: {
                    formatter: function (val) {
                        return "Q" + val;
                    },
                },
            },
        },
    };

    return (
        <div>
            <div className="row mx-1">
                <div className="col-4">
                    <div>
                        <h3 className="text-center">
                            Revenue Trend in INR Cr.
                        </h3>
                        <div>
                            <ReactApexChart
                                options={graphdata.options}
                                series={graphdata.series}
                                type="bar"
                                height={500}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT dIV  */}

                <div className="col-8">
                    <div>
                        <table class="table text-left table-bordered">
                            <thead
                                className="text-dark text-center"
                                style={{ background: "#F5C4AF" }}
                            >
                                <tr>
                                    <th scope="col" style={{ width: "27%" }}>
                                        Paramters
                                    </th>
                                    <th
                                        // colSpan={2}
                                        className="text-center"
                                        scope="col"
                                        style={{ width: "77%" }}
                                    >
                                        Observations
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        scope="row"
                                        className=" m-2"
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            background: "#E66C37",
                                            color: "white",
                                        }}
                                    >
                                        {data?.RevenueFY21?.KPI}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        {data?.RevenueFY21?.KeyObservations}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        scope="row"
                                        className=" m-2"
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            background: "#E66C37",
                                            color: "white",
                                        }}
                                    >
                                        {data?.RevenueFY22?.KPI}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        {data?.RevenueFY22?.KeyObservations}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        scope="row"
                                        className=" m-2"
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            background: "#E66C37",
                                            color: "white",
                                        }}
                                    >
                                        {data?.RevenueFY25?.KPI}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        {data?.RevenueFY25?.KeyObservations}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <table class="table text-left table-bordered">
                            <thead
                                className="text-dark text-center"
                                style={{ background: "#F5C4AF" }}
                            >
                                <tr>
                                    <th scope="col" style={{ width: "27%" }}>
                                        Paramters
                                    </th>
                                    <th
                                        // colSpan={2}
                                        className="text-center"
                                        scope="col"
                                        style={{ width: "77%" }}
                                    >
                                        Observations
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        scope="row"
                                        className=" m-2"
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            background: "#E66C37",
                                            color: "white",
                                        }}
                                    >
                                        {data?.RevenuevsIndustryGrowth?.KPI}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        {
                                            data?.RevenuevsIndustryGrowth
                                                ?.KeyObservations
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        scope="row"
                                        className=" m-2"
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            background: "#E66C37",
                                            color: "white",
                                        }}
                                    >
                                        {
                                            data?.TargetvsCurrentRevenueGrowth
                                                ?.KPI
                                        }
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        {
                                            data?.TargetvsCurrentRevenueGrowth
                                                ?.KeyObservations
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue_main;
