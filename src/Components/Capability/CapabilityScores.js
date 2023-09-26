import React from 'react';
import { Row, Col } from 'reactstrap';

const CapabilityScores = (props) => {
    let gridItem = props.scores.map((score, key) => {
        //console.log(score)
        let iconClass = "far fa-check-circle";
        let statLabel = "Complete";
        let box =1;
        if(score.status === "2") {
            iconClass = "far fa-clock";
            statLabel = "In Progress";
            box       = 2;
        }
        if(score.status === "1") {
            iconClass = "far fa-times-circle";
            statLabel = "Not Started";
            box       = 3;

        }
        return (
            <Col xl="" className={"mb-4 box-width box-sec-"+(box)} key={'scoreStat'+key}>
                <div className="card shadow h-100 py-2 bg-white">
                    <div className="card-body">
                        <Row className="no-gutters text-center">
                            <div className="col">
                                <span><i className={iconClass}></i></span>
                            </div>
                            <div className="col-8">
                                <h5 className="h5 mb-0">{score.count}</h5>
                                <p className="text-xs mb-1">{statLabel}</p>
                            </div>
                        </Row>
                    </div>
                </div>
            </Col>
        )
    })
    return (
        <Row className="business-decomposition-box-sec mt-2">
            {gridItem}
        </Row>
    );
}

export default CapabilityScores;