import React from "react";

const Revenue = ({ data }) => {
    return (
        <div>
            <div className="row mx-1">
                {/* LEFT DIV  */}
                <div className="col-3">
                    <div
                        className=" text-dark text-center shadow-lg p-1"
                        style={{ background: "#F2F2F2" }}
                    >
                        <p className="my-0">{data?.RevenueGrowthFY22?.Title}</p>
                        <h1
                            className={`my-0 ${
                                data?.RevenueGrowthFY22?.ValuePercent <
                                data?.RevenueGrowthFY22?.BenchmarkPercent
                                    ? "text-danger"
                                    : "text-success"
                            } py-3`}
                        >
                            {" "}
                            {data?.RevenueGrowthFY22?.ValuePercent}%
                        </h1>
                        <p>
                            Benchmark{" "}
                            {data?.RevenueGrowthFY22?.BenchmarkPercent}%
                        </p>
                    </div>
                    <div
                        className=" text-dark text-center shadow-lg p-1 my-2"
                        style={{ background: "#F2F2F2" }}
                    >
                        <p className="my-0">
                            {data?.RevenueSharefromTopCustomersinFY22?.Title}
                        </p>
                        <h1
                            className={`my-0 ${
                                data?.RevenueSharefromTopCustomersinFY22
                                    ?.ValuePercent <
                                data?.RevenueSharefromTopCustomersinFY22
                                    ?.BenchmarkPercent
                                    ? "text-danger"
                                    : "text-success"
                            } py-3`}
                        >
                            {
                                data?.RevenueSharefromTopCustomersinFY22
                                    ?.ValuePercent
                            }
                            %{" "}
                        </h1>
                        <p>
                            Benchmark{" "}
                            {
                                data?.RevenueSharefromTopCustomersinFY22
                                    ?.BenchmarkPercent
                            }
                            %
                        </p>
                    </div>
                    <div
                        className=" text-dark text-center shadow-lg p-1 my-2"
                        style={{ background: "#CFD3EC" }}
                    >
                        <p className="my-0">{data?.MarketShareFY22?.Title}</p>
                        <h1
                            className={`my-0 ${
                                data?.MarketShareFY22?.ValuePercent <
                                data?.MarketShareFY22?.BenchmarkPercent
                                    ? "text-danger"
                                    : "text-success"
                            } py-3`}
                        >
                            {" "}
                            {data?.MarketShareFY22?.ValuePercent}%{" "}
                        </h1>
                        <p>
                            Benchmark {data?.MarketShareFY22?.BenchmarkPercent}%
                        </p>
                    </div>
                    <div
                        className=" text-dark text-center shadow-lg p-1 my-2"
                        style={{ background: "#FAE2D7" }}
                    >
                        <p className="my-0">
                            {data?.ecommerceRevenueFY22?.Title}
                        </p>
                        <h1
                            className={`my-0 ${
                                data?.ecommerceRevenueFY22?.ValuePercent <
                                data?.ecommerceRevenueFY22?.BenchmarkPercent
                                    ? "text-danger"
                                    : "text-success"
                            } py-3`}
                        >
                            {data?.ecommerceRevenueFY22?.ValuePercent}%{" "}
                        </h1>
                        <p>
                            Benchmark{" "}
                            {data?.ecommerceRevenueFY22?.BenchmarkPercent}%
                        </p>
                    </div>
                    <div
                        className=" text-dark text-center shadow-lg p-1 my-2"
                        style={{ background: "#FAE2D7" }}
                    >
                        <p className="my-0">
                            {data?.ecommerceRevenueTarget?.Title}
                        </p>
                        <h1
                            className={`my-0 ${
                                data?.ecommerceRevenueTarget?.ValuePercent <
                                data?.ecommerceRevenueTarget?.BenchmarkPercent
                                    ? "text-danger"
                                    : "text-success"
                            } py-3`}
                        >
                            {data?.ecommerceRevenueTarget?.ValuePercent}%{" "}
                        </h1>
                        <p>
                            Benchmark{" "}
                            {data?.ecommerceRevenueTarget?.BenchmarkPercent}%
                        </p>
                    </div>
                </div>

                {/* RIGHT DIV  */}
                <div className="col-9">
                    <div class="border" style={{ height: "150px" }}>
                        <h5
                            class="light-greydiv-observation-label text-white"
                            style={{ background: "#B3B3B3" }}
                        >
                            <span class="observation-sort-arrow">
                                <i
                                    class="fa fa-caret-down"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            Key Observation
                        </h5>
                        <p>{data?.RevenueGrowthFY22?.KeyObservations}</p>
                    </div>

                    <div class="border my-2" style={{ height: "150px" }}>
                        <h5
                            class="light-greydiv-observation-label text-white"
                            style={{ background: "#B3B3B3" }}
                        >
                            <span class="observation-sort-arrow">
                                <i
                                    class="fa fa-caret-down"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            Key Observation
                        </h5>
                        <p>
                            {
                                data?.RevenueSharefromTopCustomersinFY22
                                    ?.KeyObservations
                            }
                        </p>
                    </div>
                    <div class="border my-3" style={{ height: "150px" }}>
                        <h5
                            class="light-greydiv-observation-label text-white"
                            style={{ background: "#A0A7D8" }}
                        >
                            <span class="observation-sort-arrow">
                                <i
                                    class="fa fa-caret-down"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            Key Observation
                        </h5>
                        <p>{data?.MarketShareFY22?.KeyObservations}</p>
                    </div>
                    <div class="border my-" style={{ height: "150px" }}>
                        <h5
                            class="light-greydiv-observation-label text-white"
                            style={{ background: "#F5C4AF" }}
                        >
                            <span class="observation-sort-arrow">
                                <i
                                    class="fa fa-caret-down"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            Key Observation
                        </h5>
                        <p>{data?.ecommerceRevenueFY22?.KeyObservations}</p>
                    </div>

                    <div class="border my-2" style={{ height: "150px" }}>
                        <h5
                            class="light-greydiv-observation-label text-white"
                            style={{ background: "#F5C4AF" }}
                        >
                            <span class="observation-sort-arrow">
                                <i
                                    class="fa fa-caret-down"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            Key Observation
                        </h5>
                        <p>{data?.ecommerceRevenueTarget?.KeyObservations}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;
