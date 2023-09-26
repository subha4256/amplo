import React from "react";
import StartegyBarGraph from "./StartegyBarGraph";

const StrategyAssementThreeMain = () => {
    return (
        <div>
            <div className="row mx-2">
                <div className="col-4">
                    <div>
                        <h2 className="text-primary">Strength and Weakness</h2>
                    </div>
                    <StartegyBarGraph />
                </div>

                <div className="col-8">
                    <div className="d-flex justify-content-end text-white">
                        <div
                            className="px-5 py-2 "
                            style={{ background: "#E66C37" }}
                        >
                            Weakness
                        </div>
                        <div
                            className="px-5 py-2 mx-4 "
                            style={{ background: "#F3F300" }}
                        >
                            {" "}
                            <p className="text-dark m-0">Netural</p>{" "}
                        </div>
                        <div
                            className="px-5 py-2 "
                            style={{ background: "#00BD19" }}
                        >
                            Strength
                        </div>
                    </div>

                    <div>
                        <table class="table text-left table-bordered">
                            <thead
                                className="text-dark text-center"
                                style={{ background: "#F5C4AF" }}
                            >
                                <tr>
                                    <th scope="col" style={{ width: "17%" }}>
                                        SR NO.
                                    </th>
                                    <th
                                        // colSpan={2}
                                        className="text-center"
                                        scope="col"
                                        style={{ width: "40%" }}
                                    >
                                        Quesitons
                                    </th>
                                    <th scope="col" style={{ width: "45%" }}>
                                        Response
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        scope="row"
                                        style={{
                                            background: "#00BD19",
                                            borderBottom: "5px solid #f5c4af",
                                        }}
                                        className=" m-2 "
                                    >
                                        s3asddfasdff4
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                        quod optio sint totam voluptate in,
                                        laudantium deleniti est assumenda
                                        dolorem dolore dignissimos. Porro.
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                        quod optio sint totam voluptate in,
                                        laudantium deleniti est assumenda Jacob
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        scope="row"
                                        style={{
                                            background: "#00BD19",
                                            borderBottom: "5px solid #f5c4af",
                                        }}
                                        className=" m-2 "
                                    >
                                        s3asddfasdff4
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                       
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                        quod optio sint totam voluptate in,
                                       
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        scope="row"
                                        style={{
                                            background: "#00BD19",
                                            borderBottom: "5px solid #f5c4af",
                                        }}
                                        className=" m-2 "
                                    >
                                        s3asddfasdff4
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                       
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                        quod optio sint totam voluptate in,
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        scope="row"
                                        style={{
                                            background: "#00BD19",
                                            borderBottom: "5px solid #f5c4af",
                                        }}
                                        className=" m-2 "
                                    >
                                        s3asddfasdff4
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                        
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: "5px solid #f5c4af",
                                            borderLeft: "5px solid #f5c4af",
                                        }}
                                    >
                                        Jacob Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Eum alias
                                        qui dicta asperiores minus beatae porro,
                                        
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

export default StrategyAssementThreeMain;
