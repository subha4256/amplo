import React, {Component} from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import {  Row, Col, Button } from 'reactstrap';
import { GoalSettingsWrapper } from '../Styling/GoalSettings';
import axios from 'axios';
import { getAflyScore } from '../../../actions/benchmarkingActions';

const config = require('../../../config');

class GoalSetting extends Component {
    constructor(props) {
        super(props);        
        let domainsObj = {};
        for(let i=0; i < this.props.domains.length; i++) {
          //console.log(this.props.domains[i].score_values.goal_setting);
          domainsObj['sliderValue'+(i+1)] = this.props.domains[i].score_values.goal_setting;
        }
        this.state = {
          ...domainsObj,
          ASISAFlyscore : 0
        };
    }

    componentDidMount = () => {
      axios.get(`${config.laravelBaseUrl}getASISAflyScores/${this.props.lock.project_id}`,{
        headers : {
          authorization : sessionStorage.getItem('userToken')
        }
      }).then(res=>{
        this.setState({
          ASISAFlyscore : res.data.data[0].AsIsAFlyScore
        });
      })
    }

    componentDidUpdate(prevProps) {      
      if(prevProps.value !== this.props.value) {
        this.setState({value: this.props.value});
      }
    }

    componentWillReceiveProps(nextProps) {
    }

    handleNext() {
      let goalSettingData = [];
      for(let i=0; i < this.props.domains.length; i++) {
        goalSettingData.push({
          domain_id: this.props.domains[i].DomainID,
          goal_setting: this.state['sliderValue'+(i+1)]
        })
      }
      console.log(goalSettingData);
      this.props.onNext(goalSettingData);
    }

    render() {


      let sliderValues = {...this.state};
      let greaterThenOne = false;
      for(let  i in sliderValues){
        if(sliderValues[i] > 0){
          greaterThenOne =true
        }
      }
      const { lock } = this.props
      // let doms = this.props.domains.map((domain, ind)=> {
      //   return {
      //     ...domain,
      //     score_values : {
      //       ...domain.score_values,
      //       industry_benchmark : domain.score_values.industry_benchmark > 0 ? domain.score_values.industry_benchmark : this.props.aFlyDomainScore[ind] ? Object.keys(this.props.aFlyDomainScore[ind]) > 0 ? this.props.aFlyDomainScore[ind].DomainScore : 0 : 0
      //     }
      //   }
      // })
      let domainArr = this.props.domains.map((domain, key) => {
        console.log('the domain',domain);
        let ind_bench = this.props.aFlyDomainScore[key] ? this.props.aFlyDomainScore[key].DomainScore : null;
        return (
          <Row className={'border-bottom pb-3 goalSlider'+key} key={'domainSlider-'+key}>
            <Col sm="2">
              <p className="btext">{domain.DomainName}</p>
            </Col>
            <Col sm="10">
              <InputRange
                maxValue={5}
                minValue={0}
                step={0.1}
                formatLabel={value => Number.isInteger(value) ? value : `${value.toFixed(1)}`}
                value={this.state['sliderValue'+(key+1)]}
                onChange={value => this.setState({ ['sliderValue'+''+(key+1)]: value })}
                disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : Number(domain.score_values.asis_benchmark) > 0 ? false : true } 
                />
              <div className="slider-handle-triangle" style={{left: (domain.score_values.asis_benchmark * 20) - 1 +'%'}}><span className="tooltp">{ domain.score_values.asis_benchmark }</span></div>
              <div className="slider-handle-triangle1" style={{left: ( ind_bench ? ind_bench * 20 : domain.score_values.industry_benchmark * 20) - 1 +'%'}}><span className="tooltp" style={{color : "#007bff"}} >{ ind_bench ? ind_bench : domain.score_values.industry_benchmark }</span></div>
            </Col>
          </Row>
        )
      });
      let NumForClass = this.state.ASISAFlyscore;
        return (
          <>
            <Col md="12" lg="12" xl="8">
            <div className="bg-light mb-3">
            <div class="newBenchmarks"><p style={{fontWeight:500,fontSize:"15px"}}><span>AS-IS AFLY Score :</span><span className={Number(NumForClass) > 3 ? "text-success" : Number(NumForClass) < 3 ? "text-danger" : "text-warning" }><b> {NumForClass} </b></span></p><p style={{fontWeight:500,fontSize:"15px"}}><span>INDUSTRY BENCHMARKED AFLY Score :</span><span className="text-primary" ><b> {this.props.aFlyScore.length > 0 ? this.props.aFlyScore[0].AFlyscore?this.props.aFlyScore[0].AFlyscore:0:0} </b></span></p></div>
              </div>
                <div className="bg-light">
                    <GoalSettingsWrapper>
                        <div className="pa-goal-setting">
                          {domainArr}
                        </div>
                    </GoalSettingsWrapper>
                </div>
            </Col>
            <Col md="12" lg="12" xl="8" className="text-center mt-4">
              <>
              <Button color="info" className="mb-2 mr-4" onClick={this.handleNext.bind(this)} disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : greaterThenOne == true ? false : true }>SAVE PROGRESS</Button>
              {/* <Button color="info" className="mb-2" disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : false }>VIEW RESULTS</Button> */}
              <Button color="info" onClick={this.handleNext.bind(this)} disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? false : greaterThenOne == true ? false : true }  className="mb-2">VIEW RESULTS</Button>
              
              </>
              
            </Col>
          </>
        )
    }
}

const mapStateToProps = (state) => ({
  aFlyScore : state.benchmarkingData.aFlyScore,
  aFlyDomainScore : state.benchmarkingData.aFlyDomainScore
})

export default connect(mapStateToProps, { getAflyScore })(GoalSetting);