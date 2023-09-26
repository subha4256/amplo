import React from 'react';
import { Row, Col } from 'reactstrap';

const DomainProgress = (props) => {
    let domainsLists = props.domains.map((domain, i) => {
        let domainClass = 'list-inline-item';
        //console.log(props.quizDone);
        //if(!props.quizDone) {
            if(props.domainIndex === i ) {
                domainClass = 'list-inline-item active'
            }
            if(props.domainIndex > i) {
                domainClass = 'list-inline-item active'
            }
            if(domain.IsAuditLogPresent == 1) {
                domainClass = 'list-inline-item active-tick'
            } 
                      
        //}
        
        return (
            <li className={ domainClass } key={'domain-list-'+domain.DomainID}>
                <a href="#" onClick={(e) => props.handleDomainClick(e, domain.DomainID)}>{domain.DomainName}</a>
            </li>
        )
    })
    return (
        <Row className="bench-marking-sec mt-2">
             <Col md="12" lg="12" xl="8" className="pl-0">
            <div className="bench-marking-sec-width">
                <div className="bg-light">
                    <h2>AmpMarking</h2>
                    <div className="table-responsive">
                    <div className="benchmarking-map">
                        <ul className="list-inline">
                            {domainsLists}
                            <li className={props.quizDone ? "list-inline-item active" : "list-inline-item"} key={'domain-list-goal-setting'}><a href="#" onClick={(e)=>{props.handleCompleteGoalClick(e)}}>Complete Goal</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            </Col>
        </Row>
    )
}
export default DomainProgress;