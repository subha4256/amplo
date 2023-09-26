import React from "react";
import ReactApexChart from "react-apexcharts";

const StartegyBarGraph = () => {
    let barData = {
        series: [
            {
                data: [1, 3, 5, 4, 1, 3, 1, 3],
            },
        ],
        options: {
            chart: {
                type: "bar",

                height: 430,
            },
            legend: {
                show: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: "top",
                    },
                },
            },

            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: "18px",
                    colors: ["#fff"],
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: ["#fff"],
            },
            tooltip: {
                shared: true,
                intersect: false,
            },
            xaxis: {
                categories: [
                    "People",
                    "Process",
                    "Quality",
                    "R&D",
                    "Assortment",
                    "Distribution",
                    "Technology",
                    "Track Around",
                ],
            },

            yaxis: {
                // show: true,
                title: {
                    text: "Parameters",
                    rotate: 90,
                    style: {
                        color: "black",
                        fontSize: "13px",

                        fontWeight: 200,
                        cssClass: "apexcharts-yaxis-title",
                    },
                },
            },
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={barData.options}
                    series={barData.series}
                    type="bar"
                    height={620}
                />
            </div>
        </div>
    );
};

export default StartegyBarGraph;
