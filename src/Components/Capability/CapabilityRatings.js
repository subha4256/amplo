import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CapabilityRatings extends Component {
    render() {
        return (
            <Row className="business-heatmap-box-sec mt-2 mb-0">
                <Col xl="12">
                    <div className="heatmap-box-list">
                        <div className="shadow h-100 bg-white py-3 px-5 mb-4 border-excellent">
                            <div className="text-center">
                                <h5 className="h5 mb-0">5.0</h5>
                                <p className="text-xs mb-0">Excellent</p>
                            </div>
                        </div>
                        <div className="shadow h-100 bg-white py-3 px-5 mb-4 border-good">
                            <div className="text-center">
                                <h5 className="h5 mb-0">4.0</h5>
                                <p className="text-xs mb-0">Good</p>
                            </div>
                        </div>
                        <div className="shadow h-100 bg-white py-3 px-5 mb-4 border-average">
                            <div className="text-center">
                                <h5 className="h5 mb-0">3.0</h5>
                                <p className="text-xs mb-0">Average</p>
                            </div>
                        </div>
                        <div className="shadow h-100 bg-white py-3 px-5 mb-4 border-satisfactory">
                            <div className="text-center">
                                <h5 className="h5 mb-0">2.0</h5>
                                <p className="text-xs mb-0">Satisfactory</p>
                            </div>
                        </div>
                        <div className="shadow h-100 bg-white py-3 px-5 mb-4 border-poor">
                            <div className="text-center">
                                <h5 className="h5 mb-0">1.0</h5>
                                <p className="text-xs mb-0">Poor</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default CapabilityRatings;