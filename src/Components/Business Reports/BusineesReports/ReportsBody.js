import React from "react";
// import "./css/table.css"

const ReportsBody = ({ data }) => {
    console.log(data);
    return (
        <div className="mx-3 mt-2">
            {data?.map((question) => (
                <div className="mb-4" key={question.DomainId}>
                    <div style={{ background: "#FFA1A1" }}>
                        <h3 className="text-dark-fw-bold text-center p-2">
                            {question.domain_name}
                        </h3>
                    </div>

                    <div>
                        <table class="table text-left">
                            <thead
                                className="text-white"
                                style={{ background: "#F66B0E" }}
                            >
                                <tr>
                                    <th scope="col" style={{ width: "10%" }}>
                                        SR NO.
                                    </th>
                                    <th
                                        colSpan={4}
                                        className="text-center"
                                        scope="col"
                                        style={{ width: "50%" }}
                                    >
                                        Quesitons
                                    </th>
                                    <th
                                        scope="col"
                                        style={{ width: "40%" }}
                                        className="text-center"
                                    >
                                        Response
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {question.Questions.map((ques) => {
                                    let totalStar = [];
                                    let star =
                                        ques.response.includes("star") &&
                                        ques.response.replace(/\D/g, "");
                                    totalStar.length = star;
                                    totalStar.fill("★");
                                    return (
                                        <tr key={ques.question_id}>
                                            <td scope="row">
                                                {ques.question_serial_no}
                                            </td>
                                            <td
                                                colSpan={4}
                                                className="text-left"
                                            >
                                                {ques.question_text}
                                            </td>
                                            <td className="">
                                                {star ? (
                                                    <span
                                                        style={{
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {totalStar.join(" ")}
                                                    </span>
                                                ) : (
                                                    ques.response_text
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReportsBody;
