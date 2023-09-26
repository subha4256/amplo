import React from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ height, width, font, fillData, type }) => {
    let data = {
        series: [fillData],
        options: {
            chart: {
                type: "radialBar",

                offsetY: -20,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,

                    track: {
                        background: "#e7e7e7",
                        strokeWidth: "97%",
                        margin: 5, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: "#999",
                            opacity: 1,
                            blur: 2,
                        },
                    },

                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: font + "px",
                        },
                    },
                },
            },

            grid: {
                padding: {
                    top: -10,
                },
            },

            fill: {
                colors: "#e0823f",
                // type: "",
                // gradient: {
                //     shade: "light",
                //     shadeIntensity: 0.4,
                //     inverseColors: false,
                //     opacityFrom: 1,
                //     opacityTo: 1,
                //     stops: [0, 50, 53, 91],
                // },
            },
            labels: ["Average Results"],
            
        },
    };

    return (
        // <div id="chrt_progress" style={{ position: "relative" }}>
        <ReactApexChart
            options={data.options}
            series={data.series}
            type="radialBar"
            height={height}
            width={width}
        />

        // </div>
    );
};

export default Graph;

//   <h5
//     style={{
//         position: "absolute",
//         left: type === "overall" ? 90 : 60,
//     }}
// >
//     0%
// </h5>
// <h5
//     style={{
//         position: "absolute",
//         right: type === "overall" ? 90 : 30,
//     }}
// >
//     100%
// </h5>
