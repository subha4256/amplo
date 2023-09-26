import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import "react-datepicker/dist/react-datepicker.css";

const config = require('../../config');
//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
       
            return (
                <div className="row kpi-setting-sec">
    
                    <div className="col-md-12">
                        <div className="col-sm-12 col-md-10 col-lg-10 mb-5">
                            <div className="price-container">
                            <div className="price-box" key={'kpiItem-'}>
                                        <div className={`top-bg ${this.props.bgClass}`}>
                                            <h3 style={{textAlign:"center"}}>{this.props.heading}</h3>
                                        </div>
                                        <div className="bottom-content">
                                        {this.props.innerComponent}
                                        <div style={{marginTop:"20px","textAlign":"center"}}>
                                        <h3 onClick={() =>this.props.functionClick()} style={{cursor:"pointer"}}><u>Click Here</u></h3>
                                        </div>
                                        </div>
                                    </div>
    
                                
                            </div>
                        </div>
    
                    </div>
                </div>
            )

        }
        
    }

Card.propTypes = {
    
}

const mapStateToProps = state => ({
    
});
export default connect(mapStateToProps, {  })(withRouter(Card));