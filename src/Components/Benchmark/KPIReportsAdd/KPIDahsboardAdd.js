// import React, { useEffect, useState } from "react";

// let data = {};

// let inputs = {
//     market_indicator: [
//         { title: "Market Size", name: "marketSize" },
//         { title: "Industry Growth", name: "industryGrowth" },
//     ],
//     growth: [
//         { title: "Revenue_fy22", name: "revenue_fy22" },
//         { title: "Revenue Growth", name: "revenueGrowth" },
//         {
//             title: "Revenue Share From TopCustomer",
//             name: "revenueShareFromTopCustomer",
//         },
//         { title: "RevenueGrowthTarget", name: "revenueGrowthTarget" },
//         { title: "MarketShare", name: "marketShare" },
//         { title: "MarketShareTarget", name: "marketShareTarget" },
//         { title: "ECommerceRevenue", name: "eCommerceRevenue" },
//         { title: "EcommerceRevenueTarget", name: "ecommerceRevenueTarget" },
//     ],
//     efficiency: [
//         { title: "Roce_fy22", name: "roce_fy22" },
//         { title: "RoceTarget", name: "roceTarget" },
//         { title: "OperatingMaginCurrent", name: "operatingMaginCurrent" },
//         { title: "OperatingMarginTarget", name: "operatingMarginTarget" },
//         { title: "Attrition", name: "attrition" },
//         { title: "WorkingCapitalCycle", name: "workingCapitalCycle" },
//         { title: "DebttoEquity", name: "debttoEquity" },
//     ],
// };

// const KPIDahsboardAdd = ({ data }) => {
//     const [input, setInput] = useState({});
//     const ref = use
 

  

//     const handleChange = (e, type, id) => {
//         let { name, value } = e.target;

//           setInput({
//             ...data ,
//             ["Market_Indicator"] : {
//                 ...data.Market_Indicator ,
//                 Data: data.Market_Indicator.Data.map(item => {
//                      if(item.KPIDashboardSubCategoryId ===id ){
//                         return {...item , Value: value}
//                      }return item
//                 })
//             }
//           })
//         // console.log(NewArr);
//         // setFillData(NewArr)
//     };

//     // console.log(arrayData);

//     console.log(input);

//     return (
//         <div className="mt-1">
//             <div className="row mx-0 text-center text-white">
//                 <div className="col-3">
//                     <div className="" style={{ background: "#E76C37" }}>
//                         <h2 className="p-2">Market Indicator </h2>
//                     </div>
//                     {inputs.market_indicator.map((item, index) => (
//                         <div
//                             className=" text-danger my-2 border border-danger"
//                             style={{ background: "#FAE2D7" }}
//                         >
//                             <h3 className="p-1">{item.title}</h3>
//                             <p className="py-5">
//                                 <h1 className="p-4 text-dark">
//                                     <div class="form-group ">
//                                         <input
//                                             placeholder={
//                                                 data?.Market_Indicator?.Data[
//                                                     index
//                                                 ]?.Value
//                                             }
//                                             type="text"
//                                             class="form-control"
//                                             id="exampleInputEmail1"
//                                             aria-describedby="emailHelp"
//                                             name={item.name}
//                                             onChange={(e) => {
//                                                 handleChange(
//                                                     e,
//                                                     "market_indicator",
//                                                     data?.Market_Indicator
//                                                         ?.Data[index]
//                                                         ?.KPIDashboardSubCategoryId
//                                                 );
//                                             }}
//                                         />
//                                     </div>
//                                 </h1>
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="col-4">
//                     <div className="" style={{ background: "#B3B3B3" }}>
//                         <h2 className="p-2 ">Growth KPIs</h2>
//                     </div>

//                     <div className="row text-dark">
//                         {inputs.growth.map((item, index) => (
//                             <div className="col-6">
//                                 <div
//                                     className="mt-1"
//                                     style={{ background: "#E6E6E6" }}
//                                 >
//                                     <p className="p-1 text-break">
//                                         {item.title}
//                                     </p>
//                                     <div class="form-group  mx-1">
//                                         <input
//                                             placeholder={
//                                                 data?.Growth_KPIs?.Data[index]
//                                                     ?.Value
//                                             }
//                                             type="text"
//                                             class="form-control"
//                                             id="exampleInputEmail1"
//                                             aria-describedby="emailHelp"
//                                             name={item.name}
//                                             onChange={(e) => {
//                                                 handleChange(e, "growth");
//                                             }}
//                                         />
//                                     </div>
//                                     {item.name != "revenue_fy22" && (
//                                         <p>Benchmark: 00 %</p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="col-5">
//                     <div className="" style={{ background: "#D9B301" }}>
//                         <h2 className="p-2 m-0">Efficiency KPIs</h2>
//                     </div>

//                     <div className="row text-success">
//                         {inputs.efficiency.map((item, index) => (
//                             <div
//                                 className={
//                                     item.name == "attrition"
//                                         ? "col-12"
//                                         : "col-6"
//                                 }
//                             >
//                                 <div
//                                     style={{ background: "#F0E199" }}
//                                     className=" mt-2 text-dark "
//                                 >
//                                     <p className="p-1 text-break">
//                                         {item.title}
//                                     </p>
//                                     <div class="form-group mx-1">
//                                         <input
//                                             placeholder={
//                                                 data?.Efficiency_KPIs?.Data[
//                                                     index
//                                                 ]?.Value
//                                             }
//                                             type="text"
//                                             class="form-control"
//                                             id="exampleInputEmail1"
//                                             aria-describedby="emailHelp"
//                                             name={item.name}
//                                             onChange={(e) => {
//                                                 handleChange(e, "efficiency");
//                                             }}
//                                         />
//                                     </div>
//                                     <p>Benchmark: 00 %</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default KPIDahsboardAdd;

// GROWTH --------------------
{
    /* 
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-2">Revenue FY22 INR Cr.</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="revenue_fy22"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">
                                    Revenue Share from Top Customers in FY22
                                </p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="revenue_fy22"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.RevenueSharefromTopCustomersinFY22
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">Revenue Growth FY22</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="revenueGrowth"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.RevenueGrowthFY22
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">Revenue Growth Target</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="revenueGrowthTarget"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.RevenueGrowthTarget
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">Market Share FY22</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="marketShare"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.MarketShareFY22?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">Market Share Target</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="marketShareTarget"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.MarketShareTarget
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">e-commerce Revenue FY22</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="eCommerceRevenue"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.ecommerceRevenueFY22
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="mt-1"
                                style={{ background: "#E6E6E6" }}
                            >
                                <p className="p-1">e-commerce Revenue Target</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="ecommerceRevenueTarget"
                                        onChange={(e) => {
                                            handleChange(e, "growth");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.ecommerceRevenueTarget
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div> */
}

//   efficiency  __________________
{
    /* <div className="col-6">
                            <div
                                style={{ background: "#F0E199" }}
                                className=" mt-2 text-dark "
                            >
                                <p className="p-1">ROCE Target</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="roceTarget"
                                        onChange={(e) => {
                                            handleChange(e, "efficiency");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.ROCETarget?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                style={{ background: "#F0E199" }}
                                className=" mt-2 text-dark"
                            >
                                <p className="p-1">
                                    Operating Margin Current (fy22)
                                </p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="operatingMaginCurrent"
                                        onChange={(e) => {
                                            handleChange(e, "efficiency");
                                        }}
                                    />
                                </div>
                                <p>
                                    Bentchmark:
                                    {"hello" ||
                                        data?.OperatingMarginCurrentfy22
                                            ?.BenchmarkPercent}
                                    %
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                style={{ background: "#F0E199" }}
                                className=" mt-2 text-dark"
                            >
                                <p className="p-1">Operating Margin Target</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="OperatingMarginTarget"
                                        onChange={(e) => {
                                            handleChange(e, "efficiency");
                                        }}
                                    />
                                </div>
                                Bentchmark:
                                {"hello" ||
                                    data?.OperatingMarginTarget
                                        ?.BenchmarkPercent}
                                %
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                style={{ background: "#F0E199" }}
                                className=" mt-2 text-dark"
                            >
                                <p className="p-1">Attrition FY22</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="attrition"
                                        onChange={(e) => {
                                            handleChange(e, "efficiency");
                                        }}
                                    />
                                </div>
                                Bentchmark:
                                {"hello" ||
                                    data?.AttritionFY22?.BenchmarkPercent}
                                %
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                style={{ background: "#F0E199" }}
                                className="mt-2 text-dark"
                            >
                                <p className="p-1">
                                    Working Capital Cycle in Days
                                </p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="workingCapitalCycle"
                                        onChange={(e) => {
                                            handleChange(e, "efficiency");
                                        }}
                                    />
                                </div>
                                Bentchmark:
                                {"hello" ||
                                    data?.WorkingCapitalCycleinDays
                                        ?.BenchmarkPercent}
                                %
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                style={{ background: "#F0E199" }}
                                className="mt-2 text-dark "
                            >
                                <p className="p-1">Debt to Equity</p>
                                <div class="form-group">
                                    <input
                                        placeholder="Enter The Value"
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="debttoEquity"
                                        onChange={(e) => {
                                            handleChange(e, "efficiency");
                                        }}
                                    />
                                </div>
                                Bentchmark:
                                {"hello" ||
                                    data?.DebttoEquity?.BenchmarkPercent}
                                %
                            </div>
                        </div> */
}
