import React from "react";
import { useParams } from "react-router-dom";

const OpreationManagmentMain = () => {
    const params = useParams()
    console.log("params",params);
    return (
        <div>
            <div className="row mx-0">
            <iframe title="Amplo Dashboard" width="1140" height="541.25" 
            src={`https://app.powerbi.com/reportEmbed?reportId=738e5a97-43f9-419f-8564-e6fdf1f5b982&autoAuth=true&ctid=7aeb1417-d9cf-43c8-a378-5dc3c6383163&$filter=DS_F_P_L1/ProjectID eq ${params.id}`} frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </div>
    );
};

export default OpreationManagmentMain;
