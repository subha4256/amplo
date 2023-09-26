import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'underscore';
import { KpiSettingWrapper } from './Styling/KpiSetting';
import  Card  from './Card';

class CardSetting extends Component {
    constructor (props){
        super (props);
        this.state = {
        }
    }
    render(){
        return(
                        <div className="container-fluid container-dashboard">
                        <KpiSettingWrapper>
                            <Card
                            bgClass={this.props.bgClass}
                            heading={this.props.heading} 
                            innerComponent={this.props.innerComponent}
                            functionClick={this.props.functionClick} />
                        </KpiSettingWrapper>
                        </div>
        );
    }
}
CardSetting.propTypes = {

}

const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(mapStateToProps, {  })(CardSetting);