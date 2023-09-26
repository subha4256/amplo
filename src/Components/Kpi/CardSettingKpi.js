import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { KpiSettingWrapper } from './Styling/KpiSetting';

class CardSettingKpi extends Component {
    constructor (props){
        super (props);
        this.state = {
        }
    }
    render(){
        return(
                        <div className="container-fluid container-dashboard pl-0">
                        <KpiSettingWrapper>
						<div class="card" style={{border:"1px solid"}}>
						  <div class="card-header bbg-warning-custom" style={{minHeight:"45px"}}>
						  <h3 class="box-headerlabel card_kpi_data" title={this.props.heading}>{this.props.heading}</h3>
						  </div>
						  <div class="card-body">
							<div>
								<h4 class="box-body-label">Unit Of Measurement</h4>
								<h2 class="box-body-value" style={{fontSize:"20px"}}>{this.props.UnitOfMeasurement}</h2>
							</div>
							<div class="mt-4">
								<h4 class="box-body-label">Expected Target Growth</h4>
								<h2 class="box-body-value" style={{fontSize:"20px"}}>{this.props.UnitOfMeasurement=='amount'?'$':''}{this.props.ExpectedTargetGrowthAmount}</h2>
							</div>
						  </div>
						 
					</div>
                        </KpiSettingWrapper>
                        </div>
        );
    }
}
CardSettingKpi.propTypes = {

}

const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(mapStateToProps, {  })(CardSettingKpi);