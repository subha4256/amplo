import React from "react";
import ReactApexChart from "react-apexcharts";

const Revenue_main_third = ({ data }) => {
    let graphData = {
        series: [
            {
                name: "sales",
                data: [
                    {
                        x: data?.RevenueFY21?.Title,
                        y: data?.RevenueFY21?.RevenueTrend,
                    },
                    {
                        x: data?.RevenueFY22?.Title,
                        y: data?.RevenueFY22?.RevenueTrend,
                    },
                    {
                        x: data?.RevenueFY25?.Title,
                        y: data?.RevenueFY25?.RevenueTrend,
                    },
                ],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 380,
                toolbar: {
                    show: false,
                },
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
                {/* LEFT DIV  */}
                <div className="col-4">
                    <div>
                        <h5 className="text-center">
                            Revenue Trend in INR Cr.
                        </h5>
                        <div>
                            <ReactApexChart
                                options={graphData.options}
                                series={graphData.series}
                                type="bar"
                                height={300}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT DIV  */}
                <div className="col-8">
                    <div className="m-1">
                        <div>
                            <table class="table text-left table-bordered">
                                <thead
                                    className="text-dark text-center"
                                    style={{ background: "#F5C4AF" }}
                                >
                                    <tr>
                                        <th
                                            scope="col"
                                            style={{ width: "27%" }}
                                        >
                                            Growth Lever
                                        </th>
                                        <th
                                            // colSpan={2}
                                            className="text-center"
                                            scope="col"
                                            style={{ width: "77%" }}
                                        >
                                            Challenges and Advantage
                                            "Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            scope="row"
                                            className=" m-2"
                                            style={{
                                                borderBottom:
                                                    "5px solid #f5c4af",
                                            }}
                                        ></td>
                                        <td
                                            style={{
                                                borderBottom:
                                                    "5px solid #f5c4af",
                                                borderLeft: "5px solid #f5c4af",
                                            }}
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td
                                            scope="row"
                                            className=" m-2"
                                            style={{
                                                borderBottom:
                                                    "5px solid #f5c4af",
                                            }}
                                        ></td>
                                        <td
                                            style={{
                                                borderBottom:
                                                    "5px solid #f5c4af",
                                                borderLeft: "5px solid #f5c4af",
                                            }}
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td
                                            scope="row"
                                            className=" m-2"
                                            style={{
                                                borderBottom:
                                                    "5px solid #f5c4af",
                                            }}
                                        ></td>
                                        <td
                                            style={{
                                                borderBottom:
                                                    "5px solid #f5c4af",
                                                borderLeft: "5px solid #f5c4af",
                                            }}
                                        ></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE  */}
            <div className="mx-2">
                <div>
                    <table class="table text-left table-bordered">
                        <thead
                            className="text-dark text-center"
                            style={{ background: "#F5C4AF" }}
                        >
                            <tr>
                                <th scope="col" style={{ width: "27%" }}>
                                    Growth Dimension
                                </th>
                                <th
                                    // colSpan={2}
                                    className="text-center"
                                    scope="col"
                                    style={{ width: "77%" }}
                                >
                                    GrowthDimension
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
                                    }}
                                >
                                    {data?.Enterexportmarkets?.GrowthDimension}
                                </td>
                                <td
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                        borderLeft: "5px solid #f5c4af",
                                    }}
                                >
                                    {data?.Enterexportmarkets?.Description}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    scope="row"
                                    className=" m-2"
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                    }}
                                >
                                    {
                                        data
                                            ?.Enternewmarketswithexistingproducts
                                            ?.GrowthDimension
                                    }
                                </td>
                                <td
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                        borderLeft: "5px solid #f5c4af",
                                    }}
                                >
                                    {
                                        data
                                            ?.Enternewmarketswithexistingproducts
                                            ?.Description
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td
                                    scope="row"
                                    className=" m-2"
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                    }}
                                >
                                    {
                                        data?.Newproductstoexistingcustomers
                                            ?.GrowthDimension
                                    }
                                </td>
                                <td
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                        borderLeft: "5px solid #f5c4af",
                                    }}
                                >
                                    {
                                        data?.Newproductstoexistingcustomers
                                            ?.Description
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td
                                    scope="row"
                                    className=" m-2"
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                    }}
                                >
                                    {
                                        data?.Penetrateexistingmarkets
                                            ?.GrowthDimension
                                    }
                                </td>
                                <td
                                    style={{
                                        borderBottom: "5px solid #f5c4af",
                                        borderLeft: "5px solid #f5c4af",
                                    }}
                                >
                                    {
                                        data?.Penetrateexistingmarkets
                                            ?.Description
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Revenue_main_third;
