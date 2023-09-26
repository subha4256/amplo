import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');

//.. Ashim: Need to implement LoadAPI
class ReportProcessSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          projectName: "",
          topProcessCount: 0,
          bottomProcessCount: 0,
          processSummary: {
            options: {
              labels: [],
              colors: [],
              legend: {
                  show: false
              },
              tooltip: {
                enabled: false
              },
              dataLabels: {
                style: {
                    colors: ["#000000"],
                    fontSize: '15px'
                },
                dropShadow: {
                    enabled: false,
                    opacity: 0.40
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    show: false
                  }
                }
              }]
            },
            series: []
          },
          top5Process: {
            options: {
              chart: {
                toolbar: {
                  show: false
                }
              },
              tooltip: {
                enabled: true,
                y: {
                  title: {
                    formatter: function () {
                      return ''
                    }
                  }
                },
              },
              plotOptions: {
                bar: {
                  distributed: true,
                  horizontal: true,
                }
              },
              colors: [],
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: ['', '', '', '', ''],
              },
              yaxis: {
                min: 0,
                max: 5,
              }
            },
            series: [{
              data: []
            }]
          },
          lowPerformingProcess: {
            options: {
              chart: {
                toolbar: {
                  show: false
                }
              },
              tooltip: {
                enabled: true,
                y: {
                  title: {
                    formatter: function () {
                      return ''
                    }
                  }
                },
              },
              plotOptions: {
                bar: {
                  distributed: true,
                  horizontal: true,
                }
              },
              colors: [],
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: ['', '', '', '', ''],
              },
              yaxis: {
                min: 0,
                max: 5,
              }
            },
            series: [{
              data: []
            }]
          }
        }
    }

    async getPL1ProcessSummary(projectId) {
      const headers = {
        "authorization": "Bearer " + CacheStorage.getItem("userToken")
      }
      await axios.get(config.laravelBaseUrl+'get_l1_process_summary_pie/'+projectId, {
        headers: headers
      })
      .then(res => {
        const data = res.data.data;
        var series = [];
        var labels = [];
        var colors = [];
        if(data.scores.length > 0){
        for(var i = 0; i<data.scores.length; i++)
        {
          series.push(Math.round(data.scores[i].Percentage));
          labels.push(data.scores[i].Status);
          if(data.scores[i].Status === 'Poor'){
            colors.push('#ff786e');            
          }else if(data.scores[i].Status === 'Poor'){
            colors.push('#ff786e');
          }else if(data.scores[i].Status === 'Satisfactory'){
            colors.push('#ffae7a');
          }else if(data.scores[i].Status === 'Average'){
            colors.push('#ffe687');
          }else if(data.scores[i].Status === 'Good'){
            colors.push('#b2cc83');
          }else if(data.scores[i].Status === 'Excellent'){
            colors.push('#60b17e');
          }
        }
      }
        console.log(series);
        console.log(colors);
        console.log(labels);
        const processes1 = {
          labels: labels,
          colors: colors,
          tooltip: {
            enabled: false
          },
          legend: {
              show: false
          },
          dataLabels: {
            style: {
                colors: ["#000000"],
                fontSize: '15px'
            },
            dropShadow: {
                enabled: true,
                opacity: 0.40
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }]
        }
        this.setState(prevState => ({
          projectName: data.projectName,
          processSummary: {                   // object that we want to update
              ...prevState.processSummary,    // keep all other key-value pairs
              options: processes1,
              series: series      // update the value of specific key
          }
        }))
        //console.log(res);
      }); 
    }

    async getPL1Process(projectId, $order) {
      const headers = {
        "authorization": "Bearer " + CacheStorage.getItem("userToken")
      }
      await axios.get(config.laravelBaseUrl+'get_l1_process/'+projectId+'/'+$order, {
        headers: headers
      })
      .then(res => {
        const data = res.data.data;
        var seriesData = [];
        var processData = [];
        var colors = [];
        for(var i = 0; i<data.length; i++)
        {
          seriesData.push(parseFloat(data[i].Score).toFixed(2));
          processData.push(data[i].ProcessLevel1Title);
          console.log(Math.ceil(data[i].Score));
          if(Math.ceil(data[i].Score) === 1){
            colors.push('#ff786e');            
          }else if((Math.ceil(data[i].Score)) === 1){
            colors.push('#ff786e');
          }else if((Math.ceil(data[i].Score)) === 2){
            colors.push('#ffae7a');
          }else if((Math.ceil(data[i].Score)) === 3){
            colors.push('#ffe687');
          }else if((Math.ceil(data[i].Score)) === 4){
            colors.push('#b2cc83');
          }else if((Math.ceil(data[i].Score)) === 5){
            colors.push('#60b17e');
          }
        }
        const topSeries = [{
          data: seriesData
        }];
        const processes = {
          chart: {
            toolbar: {
              show: false
            }
          },
          legend: {
            show: false
          },
          tooltip: {
            enabled: true,
            y: {
              title: {
                formatter: function () {
                  return ''
                }
              }
            },
          },
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: true,
            }
          },
          colors: colors,
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: processData,
          },
          yaxis: {
            min: 0,
            max: 5,
          }
        }
        //console.log(data.length);
        if($order === 'desc')
        {
          this.setState({
            topProcessCount: data.length
          })
          this.setState(prevState => ({
            top5Process: { 
              ...prevState.top5Process,
              options: processes,
              series: topSeries
            },
            // top5Process: {                   // object that we want to update
            //     ...prevState.top5Process,    // keep all other key-value pairs
            //     series: topSeries      // update the value of specific key
            // }
          }))
        }else{
          this.setState({
            bottomProcessCount: data.length
          })
          this.setState(prevState => ({
            lowPerformingProcess: {                   // object that we want to update
                ...prevState.lowPerformingProcess,    // keep all other key-value pairs
                options: processes,
                series: topSeries    // update the value of specific key
            }
          }))
        }
        
        console.log(res);
      }); 
    }

    componentWillMount() {
      this.getPL1ProcessSummary(this.props.projectId);
      this.getPL1Process(this.props.projectId,'desc');
      this.getPL1Process(this.props.projectId,'asc');
    }

    render() {
      
        return(
          <>
          <div className="downloadPdfReport">
            <Row  className="mb-1 mt-2 processes-head downloadPdfReport">
              <Col sm="12">
                <h1>Report for Process {this.state.projectName}</h1>
              </Col>
            </Row>
            <Row className="mb-3 processes-summary">
                <Col sm="12" md="4 posrelclass">
                  <div className="bg-white1 posrelatives">
                    <h3 className="text-left">L1 Processes Summary
                      <div className="dropdown float-right">
                        <a href="#" data-toggle="dropdown"><i className="fas fa-ellipsis-v"></i></a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">Change View</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">Export to Excel</a>
                        </div>
                      </div>
                    </h3>
                    <div className="text-center my-4" style={{display:(this.state.topProcessCount > 0) ? "block" : "none"}}>
                        <ReactApexChart options={this.state.processSummary.options} series={this.state.processSummary.series} type="pie" width="360" className="first-piechart"/>
                    </div>
                    <Col sm="12" md="12">
      <div className="d-flex ontop-posab-first">
            <div className="rating">
                <p><span className="dot-top excellent"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Excellent</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top good"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Good</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top average"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Average</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top satisfactory"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Satisfactory</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top poor"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Poor</span></p>
            </div>
        </div>
      </Col>
                  </div>
                </Col>
                <Col sm="12" md="4 posrelclass">
                  <div className="bg-white1">
                    <h3 className="text-left">Top {this.state.topProcessCount} L1 Processes </h3>
                    <div className="text-center my-4" style={{display:(this.state.topProcessCount > 0) ? "block" : "none"}}>
                      <ReactApexChart options={this.state.top5Process.options} series={this.state.top5Process.series} type="bar" height="280" />
                    </div>
                    <Col sm="12" md="12">
      <div className="d-flex ontop-posab">
            <div className="rating">
                <p><span className="dot-top excellent"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Excellent</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top good"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Good</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top average"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Average</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top satisfactory"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Satisfactory</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top poor"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Poor</span></p>
            </div>
        </div>
      </Col>
                  </div>
                </Col>
                <Col sm="12" md="4 posrelclass">
                  <div className="bg-white1">
                    <h3 className="text-left">Bottom {this.state.bottomProcessCount} L1 Processes </h3>
                    <div className="text-center my-4" style={{display:(this.state.bottomProcessCount > 0) ? "block" : "none"}}>
                      <ReactApexChart options={this.state.lowPerformingProcess.options} series={this.state.lowPerformingProcess.series} type="bar" height="280" />
                    </div>
                    <Col sm="12" md="12">
      <div className="d-flex ontop-posab">
            <div className="rating">
                <p><span className="dot-top excellent"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Excellent</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top good"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Good</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top average"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Average</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top satisfactory"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Satisfactory</span></p>
            </div>
            <div className="rating">
                <p><span className="dot-top poor"><i className="fa fa-stop" aria-hidden="true"></i></span><span className="posrelative-span-topprogress">Poor</span></p>
            </div>
        </div>
      </Col>
                  </div>
                </Col>
            </Row>
            </div>
          </>
        )
    }
}

export default ReportProcessSummary;