
import React, { useEffect, useState } from "react";


const KPIDahsboard = ({data}) => {
  
  return (
    <div className="mt-1">
      <div className="row mx-0 text-center text-white">
        <div className="col-3">
          <div className="" style={{ background: "#E76C37" }}>
            <h2 className="p-2">{data?.MarketIndicator?.Title} </h2>
          </div>
          <div
            className=" text-danger my-2 border border-danger"
            style={{ background: "#FAE2D7" }}
          >
            <h3 className="p-1">{data?.MarketSize?.Title}</h3>
            <p className="py-5">
              <h1 className="p-4 text-dark">{data?.MarketSize?.Value}</h1>
            </p>
          </div>

          <div
            className=" text-danger my-5 border border-danger"
            style={{ background: "#FAE2D7" }}
          >
            <h3 className="p-1">{data?.IndustryGrowthRate?.Title}</h3>
            <p className="py-5">
              <h1 className="p-4 text-dark">
                {data?.IndustryGrowthRate?.ValuePercent}%
              </h1>
            </p>
          </div>
        </div>

        <div className="col-4">
          <div className="" style={{ background: "#B3B3B3" }}>
            <h2 className="p-2 ">{data?.GrowthKPIs?.Title}</h2>
          </div>

          <div className="row text-dark">
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-2">{data?.RevenueFY22INRCr?.Title}</p>
                <h1 className="p-4 text-dark">{data?.RevenueFY22INRCr?.Value}</h1>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">
                  {data?.RevenueSharefromTopCustomersinFY22?.Title}
                </p>
                <h1 className="p-1 text-danger my-0">
                  {data?.RevenueSharefromTopCustomersinFY22?.ValuePercent}%
                </h1>
                <p>
                  Benchmark:
                  {data?.RevenueSharefromTopCustomersinFY22?.BenchmarkPercent}%
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">{data?.RevenueGrowthFY22?.Title}</p>
                <h1 className="p-2 text-success my-0">
                  {data?.RevenueGrowthFY22?.ValuePercent}%
                </h1>
                <p>
                  Benchmark:
                  {data?.RevenueGrowthFY22?.BenchmarkPercent}%
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">{data?.RevenueGrowthTarget?.Title}</p>
                <h1 className="p-2 text-success my-0">
                  {data?.RevenueGrowthTarget?.ValuePercent}%
                </h1>
                <p>Benchmark:{data?.RevenueGrowthTarget?.BenchmarkPercent}%</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">{data?.MarketShareFY22?.Title}</p>
                <h1 className="p-2 text-success my-0">
                  {data?.MarketShareFY22?.ValuePercent}%
                </h1>
                <p>Benchmark:{data?.MarketShareFY22?.BenchmarkPercent}%</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">{data?.MarketShareTarget?.Title}</p>
                <h1 className="p-2 text-success my-0">
                  {data?.MarketShareTarget?.ValuePercent}%
                </h1>
                <p>Benchmark:{data?.MarketShareTarget?.BenchmarkPercent}%</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">{data?.ecommerceRevenueFY22?.Title}</p>
                <h1 className="p-2 text-success my-0">
                  {data?.ecommerceRevenueFY22?.ValuePercent}%
                </h1>
                <p>Benchmark:{data?.ecommerceRevenueFY22?.BenchmarkPercent}%</p>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-1" style={{ background: "#E6E6E6" }}>
                <p className="p-1">{data?.ecommerceRevenueTarget?.Title}</p>
                <h1 className="p-2 text-success my-0">
                  {data?.ecommerceRevenueTarget?.ValuePercent}%
                </h1>
                <p>
                  Benchmark:{data?.ecommerceRevenueTarget?.BenchmarkPercent}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="" style={{ background: "#D9B301" }}>
            <h2 className="p-2 m-0">{data?.EfficiencyKPIs?.Title}</h2>
          </div>

          <div className="row text-success">
            <div className="col-6">
              <div style={{ background: "#F0E199" }} className=" mt-2 text-dark ">
                <p className="p-1">{data?.ROCEFY22?.Title}</p>
                <h1 className="p-2 text-success">{data?.ROCEFY22?.ValuePercent}%</h1>
                <p>Benchmark:{data?.ROCEFY22?.BenchmarkPercent}%</p>
              </div>
            </div>
            <div className="col-6">
              <div style={{ background: "#F0E199" }} className=" mt-2 text-dark ">
                <p className="p-1">{data?.ROCETarget?.Title}</p>
                <h1 className="p-2 text-success">
                  {data?.ROCETarget?.ValuePercent}%
                </h1>
                <p>Benchmark:{data?.ROCETarget?.BenchmarkPercent}%</p>
              </div>
            </div>
            <div className="col-6">
              <div style={{ background: "#F0E199" }} className=" mt-2 text-dark">
                <p className="p-1">{data?.OperatingMarginCurrentfy22?.Title}</p>
                <h1 className="p-2 text-success">
                  {data?.OperatingMarginCurrentfy22?.ValuePercent}%
                </h1>
                <p>
                  Benchmark:{data?.OperatingMarginCurrentfy22?.BenchmarkPercent}%
                </p>
              </div>
            </div>
            <div className="col-6">
              <div style={{ background: "#F0E199" }} className=" mt-2 text-dark">
                <p className="p-1">{data?.OperatingMarginTarget?.Title}</p>
                <h1 className="p-2 text-success">
                  {data?.OperatingMarginTarget?.ValuePercent}%
                </h1>
                Benchmark:{data?.OperatingMarginTarget?.BenchmarkPercent}%
              </div>
            </div>
            <div className="col-12">
              <div style={{ background: "#F0E199" }} className=" mt-2 text-dark">
                <p className="p-1">{data?.AttritionFY22?.Title}</p>
                <h1 className="p-2 text-danger">
                  {data?.AttritionFY22?.ValuePercent}%
                </h1>
                Benchmark:{data?.AttritionFY22?.BenchmarkPercent}%
              </div>
            </div>
            <div className="col-6">
              <div style={{ background: "#F0E199" }} className="mt-2 text-dark">
                <p className="p-1">{data?.WorkingCapitalCycleinDays?.Title}</p>
                <h1 className="p-2 text-danger">
                  {data?.WorkingCapitalCycleinDays?.Value}%
                </h1>
                Benchmark:{data?.WorkingCapitalCycleinDays?.BenchmarkPercent}%
              </div>
            </div>
            <div className="col-6">
              <div style={{ background: "#F0E199" }} className="mt-2 text-dark ">
                <p className="p-1">{data?.DebttoEquity?.Title}</p>
                <h1 className="p-2 text-danger">
                  {data?.DebttoEquity?.ValuePercent}%
                </h1>
                Benchmark:{data?.DebttoEquity?.BenchmarkPercent}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDahsboard;
