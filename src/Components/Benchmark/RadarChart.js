import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { fetchIot, fetchRatings, toggleLock, getLock } from '../../actions/iotActions';
import { getAflyScore } from '../../actions/benchmarkingActions';
import {  Button, Label } from 'reactstrap';
import { BenchWrapper, Container, Heading, Rectangle, PageTag } from './Styling/ChartStyling';
import ReactApexChart from 'react-apexcharts';
import ScoreGoal from './ScoreGoal';
import IoT from './IoT';
import SVGIcon from '../SVGicon';
import DownloadReport from './DownloadReport';
import axios from 'axios';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import {errorAlert,responseMessage} from '../../utils/alert';

const config = require('../../config');

class RadarChart extends Component {
	constructor(props) {
    super(props);
   
    this.state = {
      iot: [],
      Ratings: [],
      lock: null,
      project_id:this.props.match.params.id,
      asis : 0
    }
  }

  componentDidMount() {
    try{
      this.props.fetchIot();
      this.props.fetchRatings( this.state.project_id );
      this.props.getAflyScore(this.state.project_id);
      axios.get(`${config.laravelBaseUrl}getASISAflyScores/${this.state.project_id}`,{
        headers : {
          authorization : sessionStorage.getItem('userToken')
        }
      }).then(res=>{
        if(res.data.data.length > 0 && res.data.data[0].hasOwnProperty('AsIsAFlyScore')){
          this.setState({
            asis : res.data.data[0].AsIsAFlyScore
          });
        }
      })

      this.props.getLock( this.state.project_id );
    }catch(error) {
      this.setState({
        loading: false
      });
      if(error.response) {
        responseMessage("error", error.response.data.message, "");
          return;
      }
      responseMessage("error", "Something Went Wrong!", "");
      throw error;
    }
  }

  toggleIt(lock) {
    try {
      const lockData = {
        project_id: this.state.project_id, // static for now
        flag: lock
      }
      this.props.toggleLock(lockData);
    }catch(error) {
      this.setState({
        loading: false
      });
      if(error.response) {
          responseMessage("error", error.response.data.message, "");
          return;
      }
      responseMessage("error", "Something Went Wrong!", "");
      throw error;
    }
    /*this.setState({
      lock: {
        LockedStatus: lock,
        project_id: lockData.project_id
      }
    })*/
  }
  downloadpdfReport = () => {
    domtoimage.toPng(document.getElementsByClassName('downloadPdfReport')[0])
    .then(function (dataUrl) {
        const pdf = new jsPDF('p','mm',[960,710]);
        pdf.addImage(dataUrl, 'PNG', 10, 10, 230, 320);
        pdf.save("download.pdf");  
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }


  handleBack =()=>{
    this.props.history.push({
      pathname: '/benchmark-questionaire',
      state: { projId: this.props.match.params.id , projName: this.props.match.params.name}
    })
  }
  

  
  render () {
    const lock = this.props.lock;
    console.log(lock)
    const iotData = this.props.iot;
    const Ratings = this.props.Ratings;
    let labelsArr = [];
    const seriesArr = Ratings.map(rating => {
      const ratingsArr = _.pluck(rating.data, 'rating');
      labelsArr = _.pluck(rating.data, 'label');
      
      return(
        {
          name: rating.name,
          data: ratingsArr
        }
      )
    });
    console.log('LAbales array',seriesArr)
    let chartData = {
      options: {
        chart: {
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
            color: '#000',
            opacity: 0.35
          },
        },
        stroke: {
          show: true
        },
        legend: {
          position: 'left',
          markers: {
            width: 37,
            height: 10,
            radius: 0
          }
        },
        yaxis: {
          show: true,
          showAlways: true,
          tickAmount: 10,
          min: 0,
          max: 5,
          labels: {
            formatter: function(val, index) {
              console.log('formatter',val)
              return val.toFixed(1);
            }
          }
        },
        labels: labelsArr,
        dataLabels: {
          style: {
            colors: ['#2f353a']
          }
        },
        plotOptions: {
          radar: {
            polygons: {
              strokeColors: '#bfc5c8'
            }
          }
        },
        fill: {
          opacity: 0.02
        },
        markers: {
          size: 4
        }
      },
      series: seriesArr
    }
  
      return (
          <BenchWrapper>
            <Container>
              {/*  */}
              <div className="d-flex justify-content-between">
                <div className="left-align">
                  <div className="d-flex">
                  <div className="iconWrap processAccessmentWrap">
                      <SVGIcon name="ProcessAccessment" width="13px" height="13px" fill="#fff"></SVGIcon>
                    </div>
                    <div className="iconWrap businessModellingWrap">
                      <SVGIcon name="BusinessModelling" width="13px" height="13px" fill="#fff"></SVGIcon>
                    </div>
                    <div className="iconWrap designThinkingWrap">
                      <SVGIcon name="DesignThinking" width="13px" height="13px" fill="#fff"></SVGIcon>
                    </div>
                    <div className="iconWrap kpiWrap">
                      <SVGIcon name="kpi" width="13px" height="13px" fill="#fff"></SVGIcon>
                    </div>
                    <div className="iconWrap roadmapWrap">
                      <SVGIcon name="roadmap" width="13px" height="12px" fill="#fff"></SVGIcon>
                    </div>
                  </div>
                  <PageTag>AmpMarking</PageTag>
                </div>
                <div className="right">
                  <a className='pr-3' href="#" onClick={this.downloadpdfReport.bind(this)}><i style={{pointerEvents:"none"}} className="mr-2 fa fa-cloud-download"></i>Download Report</a>
                  <div className="CustomRadio">
                    <Label className="">
                      <input type="radio" className="" name="lock" id="true" value="true" onClick={this.toggleIt.bind(this, 1)} checked={lock.flag === "1" || lock.flag === 1} />
                      <Label className="" for="true"></Label>
                      <span><i className='fa fa-check'></i>Lock</span>
                    </Label>
                    <Label className="">
                      <input type="radio" className="" name="lock" id="false" value="false" onClick={this.toggleIt.bind(this, 0)} checked={lock.flag === "0" || lock.flag === 0}  />
                      <Label className="" for="false"></Label>
                      <span><i className='fa fa-check'></i>Unlock</span>
                    </Label>
                  </div>
                  <Button color="primary" onClick={this.handleBack}>Back</Button>
                </div>
              </div>
              <div id="chart" className="downloadPdfReport">
                <div style={{textAlign:"right"}}>
                  <img className="diva-logo" src={ require('../../common/images/amplofly-logo.png') } style={{height:"34px"}}/>
                </div>
                <Rectangle className='pb-0'>
                  <Heading>Industry 4.0 AmpMarking Report</Heading>
                  <div className="testingRow">
                    <div className="newBenchmarks">
                      <p><span>AS-IS AFLY Score :</span><span className={Number(this.state.asis) > 3 ? "text-success" : Number(this.state.asis) < 3 ? "text-danger" : "text-warning" }><b> {this.state.asis} </b></span></p>
                      <p><span>INDUSTRY BENCHMARKED AFLY Score :</span><span className="text-primary"><b> {this.props.aFlyScore.length > 0 ? this.props.aFlyScore[0].AFlyscore?this.props.aFlyScore[0].AFlyscore:0:0}</b></span></p>
                    </div>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="radar" height="636" />
                  </div>
                </Rectangle>
                <ScoreGoal Ratings={seriesArr} Labels={labelsArr} />
                <IoT iotData={iotData} />
                {/* <DownloadReport /> */}
              </div>
            </Container>
          </BenchWrapper>
        );
      }
    }
  RadarChart.propTypes = {
    fetchIot: PropTypes.func.isRequired,
    iot: PropTypes.array.isRequired,
    fetchRatings: PropTypes.func.isRequired,
    Ratings: PropTypes.array.isRequired,
    toggleLock: PropTypes.func.isRequired,
    getLock: PropTypes.func.isRequired,
    lock: PropTypes.object.isRequired
  }

  const mapStateToProps = state => ({
    iot: state.iot.items,
    Ratings: state.Ratings.items,
    lock: state.iot.item,
    aFlyScore : state.benchmarkingData.aFlyScore
  });
  export default connect(mapStateToProps, { fetchIot, fetchRatings, toggleLock, getLock, getAflyScore })(RadarChart);