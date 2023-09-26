import React from "react";
import { printDocument } from "../PDFConvert/savePdf";

const Header = ({ data, title, domId }) => {
    // console.log(data);
    // className={ container && "container"}

    return (
        <div>
            <div className="row p-2 mx-0">
                <div className="col-7">
                    <div className="p-3 d-flex align-items-center">
                        <h4 style={{ color: "#e76c37" }} className=" ml-3">
                            {title || "Report Name"} {" "}
                            {data?.ProjectName}
                        </h4>
                    </div>
                </div>
            {domId?
                <div className="col-5 text-center">
                    <div className="row mx-0">
                        <div
                            style={{ background: "#E6E6E6" }}
                            className="col  mx-2 p-2"
                        >
                            <span>
                                {data?.EntreprenuerName || "EntreprenuerName"}
                            </span>
                        </div>
                        <div
                            style={{ background: "#E6E6E6" }}
                            className="col   p-2"
                        >
                            <span>{data?.CompanyName || "Company Name"}</span>
                        </div>
                        <button
                            id="downLoad_button_PDF"
                            className="btn btn-primary ml-1"
                            onClick={() => printDocument(domId)}
                        >
                            Download
                        </button>
                    </div>
                </div>:''}
            </div>
        </div>
    );
};

export default Header;
