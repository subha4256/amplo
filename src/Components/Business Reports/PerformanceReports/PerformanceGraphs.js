import React from "react";
import Graph from "./Graph";

const PerformanceGraphs = ({ data }) => {
    console.log("Garph =>", data);

    return (
        <div className="">
            <div className="row text-center mx-3 " style={{ height: "85vh" }}>
                <div
                    className="col-4 d-flex flex-column align-items-stretch"
                    style={{ background: "#e8c8b0" }}
                >
                    <h1 className="p-1">Overall Performance</h1>
                    <div className="m-auto">
                        <Graph
                            fillData={+data.OverallScore}
                            font={50}
                            height={580}
                            width={580}
                            type="overall"
                        />
                    </div>
                </div>

                <div className="col-8">
                    <div
                        className="row mx-0"
                        style={{
                            height: "85vh",
                            overflowY: "scroll",
                            overflowX: "hidden",
                        }}
                    >
                        {data.OverallScore ? (
                            data?.Domain?.map((domain) => (
                                <div 
                                key={domain.DomainId}
                                    className="col-4 d-flex flex-column align-items-stretch mb-4 shadow pb-2"
                                    style={{ background: "#F9F9F9" }}
                                >
                                    <h4 className="p-1">{domain.DomainName}</h4>
                                    <div className="my-auto">
                                        <Graph
                                            fillData={
                                                domain.ThisScore.Score ?? 0
                                            }
                                            font={32}
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <h4 >Data Not Found...</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceGraphs;
