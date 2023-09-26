import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { fetchIot, fetchRatings, toggleLock, getLock } from '../actions/iotActions';
import {  Button, Label } from 'reactstrap';
import { BenchWrapper, Container, Heading, Rectangle, PageTag } from './Styling/ChartStyling';
import ReactApexChart from 'react-apexcharts';
import ScoreGoal from './ScoreGoal';
import IoT from './IoT';
import SVGIcon from './SVGicon';

class RadarChart extends Component {
	constructor(props) {
    super(props);
    this.state = {
      iot: [],
      Ratings: [],
      lock: null
    }
  }

  componentWillMount() {
    this.props.fetchIot();
    this.props.fetchRatings();
    this.props.getLock();
  }

  toggleIt(lock) {
    const lockData = {
      project_id: 1, // static for now
      flag: lock
    }
    this.props.toggleLock(lockData);
    this.setState({
      lock: {
        LockedStatus: lock,
        project_id: lockData.project_id
      }
    })
  }

  render () {
    const lock = this.props.lock;
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
          labels: {
            formatter: function(val, index) {
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
                  <a className='pr-3' href="../somefile.pdf"><i className="mr-2 fa fa-cloud-download"></i>Download Report</a>
                  <div className="CustomRadio">
                    <Label className="">
                      <input type="radio" className="" name="lock" id="true" value="true" onClick={this.toggleIt.bind(this, 1)} checked={lock.LockedStatus === "1"} />
                      <Label className="" for="true"></Label>
                      <span><i className='fa fa-check'></i>Lock</span>
                    </Label>
                    <Label className="">
                      <input type="radio" className="" name="lock" id="false" value="false" onClick={this.toggleIt.bind(this, 0)} checked={lock.LockedStatus === "0"}  />
                      <Label className="" for="false"></Label>
                      <span><i className='fa fa-check'></i>Unlock</span>
                    </Label>
                  </div>
                  <Button color="primary">Back</Button>
                </div>
              </div>
              <div id="chart">
                <Rectangle className='pb-0'>
                  <Heading>Industry 4.0 AmpMarking Report</Heading>
                  <ReactApexChart options={chartData.options} series={chartData.series} type="radar" height="636" />
                </Rectangle>
                <ScoreGoal Ratings={seriesArr} Labels={labelsArr} />
                <IoT iotData={iotData} />
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
    getLock: PropTypes.func.isRequired
  }

  const mapStateToProps = state => ({
    iot: state.iot.items,
    Ratings: state.Ratings.items,
    lock: state.iot.item
  });
  export default connect(mapStateToProps, { fetchIot, fetchRatings, toggleLock, getLock })(RadarChart);