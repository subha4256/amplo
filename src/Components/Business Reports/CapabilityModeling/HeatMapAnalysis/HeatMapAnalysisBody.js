import React from "react";
import HeatMapAnalysisMain from "./HeatMapAnalysisMain";
import DashboardHeader from "../../../includes/dashboardHeader/DashboardHeader";
import FooterComponent from '../../../includes/dashboardFooter/FooterComponent';
import { Row, Col } from 'reactstrap';
import DashboardSidebar from "../../../includes/dashboardSidebar/DashboardSidebar";
const HeatMapAnalysisBody = () => {
    return (
        <React.Fragment>
        <DashboardHeader key="dashboard-header"></DashboardHeader>
        <Row>
        <Col md={2}>
        <DashboardSidebar />
        </Col>
        <Col md={10}>
        <div id="content-wrapper" className="d-flex flex-column" style={{marginTop:"100px"}}>
            <HeatMapAnalysisMain/>
        </div>
        </Col>
        </Row>
        <FooterComponent />
        </React.Fragment>
    );
};

export default HeatMapAnalysisBody;
