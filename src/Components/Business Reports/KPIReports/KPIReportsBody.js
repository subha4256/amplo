import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../../config";
import Header from "../Header/Header";
import KPIDahsboard from "./KPIDahsboard";

// 

const KPIReportsBody = () => {

    const { id , year } = useParams();
    const [fetchData, setFetchData] = useState({});

    useEffect(() => {
        Axios.get(`${config.laravelBaseUrl}getClientKPIDashBoard/${id}/${year}`, {
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

    console.log(fetchData)


    return (
        <div id="KPI_dashboard">
            <Header title="KPI Dashboard" data={fetchData}  domId={"KPI_dashboard"} />
            <KPIDahsboard data={fetchData} />
        </div>
    );
};

export default KPIReportsBody;

let fetchData = {
    success: true,
    data: {
        ProjectName: "IVY Project",
        ProjectId: "108",
        EntreprenuerName: "Kedar Pandya",
        CompanyName: "Wadhwani Advantage",
        MarketIndicator: {
            Title: "Market Indicator",
            Value: null,
            ValuePercent: null,
            Color: null,
            BenchmarkPercent: null,
            BenchmarkValue: null,
        },
        MarketSize: {
            Title: "Market Size (INR Cr.)FY22",
            Value: "2000.00",
            ValuePercent: null,
            Color: "#000000",
            BenchmarkPercent: null,
            BenchmarkValue: null,
        },
        IndustryGrowthRate: {
            Title: "Industry Growth Rate",
            Value: null,
            ValuePercent: "30.00",
            Color: "#000000",
            BenchmarkPercent: null,
            BenchmarkValue: null,
        },
        GrowthKPIs: {
            Title: "Growth KPIs",
            Value: null,
            ValuePercent: null,
            Color: null,
            BenchmarkPercent: null,
            BenchmarkValue: null,
        },
        RevenueFY22INRCr: {
            Title: "Revenue FY22 INR Cr.",
            Value: "45.00",
            ValuePercent: null,
            Color: "#000000",
            BenchmarkPercent: null,
            BenchmarkValue: null,
        },
        RevenueSharefromTopCustomersinFY22: {
            Title: "Revenue Share from Top Customers in FY22",
            Value: null,
            ValuePercent: "20.00",
            Color: "#d64554",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        RevenueGrowthFY22: {
            Title: "Revenue Growth FY22",
            Value: null,
            ValuePercent: "20.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        RevenueGrowthTarget: {
            Title: "Revenue Growth Target",
            Value: null,
            ValuePercent: "25.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        MarketShareFY22: {
            Title: "Market Share FY22",
            Value: null,
            ValuePercent: "3.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        MarketShareTarget: {
            Title: "Market Share Target",
            Value: null,
            ValuePercent: "7.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        ecommerceRevenueFY22: {
            Title: "e-commerce Revenue FY22",
            Value: null,
            ValuePercent: "1.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        ecommerceRevenueTarget: {
            Title: "e-commerce Revenue Target",
            Value: null,
            ValuePercent: "20.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        EfficiencyKPIs: {
            Title: "Efficiency KPIs",
            Value: null,
            ValuePercent: null,
            Color: null,
            BenchmarkPercent: null,
            BenchmarkValue: null,
        },
        ROCEFY22: {
            Title: "ROCE FY22",
            Value: null,
            ValuePercent: "15.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        ROCETarget: {
            Title: "ROCE Target",
            Value: null,
            ValuePercent: "25.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        OperatingMarginCurrentfy22: {
            Title: "Operating Margin Current (fy22)",
            Value: null,
            ValuePercent: "25.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        OperatingMarginTarget: {
            Title: "Operating Margin Target",
            Value: null,
            ValuePercent: "20.00",
            Color: "#1aab40",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        AttritionFY22: {
            Title: "Attrition FY22",
            Value: null,
            ValuePercent: "5.00",
            Color: "#d64554",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        WorkingCapitalCycleinDays: {
            Title: "Working Capital Cycle in Days",
            Value: "30.00",
            ValuePercent: null,
            Color: "#d64554",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
        DebttoEquity: {
            Title: "Debt to Equity",
            Value: null,
            ValuePercent: "60.00",
            Color: "#d64554",
            BenchmarkPercent: ".00",
            BenchmarkValue: null,
        },
    },
    message: "Client KPIDash Board Assessment data  retrieved successfully",
};
