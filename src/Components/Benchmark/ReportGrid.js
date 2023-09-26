import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import ModalPopup from '../common/ModalPopup';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');

//.. Ashim: Need to implement LoadAPI
class ReportGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: this.props.gridData,
            projectName: "",
            isOpen: false,
            averageScore: [],
            functions: [],
            phases: [],
            processSummary0: {
                options: {
                    plotOptions: {
                        radialBar: {
                          offsetY: -10,
                          startAngle: 0,
                          endAngle: 360,
                          hollow: {
                            margin: 0,
                            size: '20%',
                            background:'transparent',
                            image: undefined,
                          },
                          dataLabels: {
                            name: {
                              show: false,
          
                            },
                            value: {
                              show: false,
                            }
                          }
                        }
                      },
                  labels: ['Excellent', 'Good', 'Average', 'Satisfactory', 'Poor'],
                  colors: ['#14ab4c', '#b2cc83', '#fbe17d', '#f7711c', '#f74c40'],
                  radialBar: {
                  }
                },
                series: [],
            },

            processSummary1: {
                options: {
                    plotOptions: {
                        radialBar: {
                          offsetY: -10,
                          startAngle: 0,
                          endAngle: 360,
                          hollow: {
                            margin: 0,
                            size: '20%',
                            background:'transparent',
                            image: undefined,
                          },
                          dataLabels: {
                            name: {
                              show: false,
          
                            },
                            value: {
                              show: false,
                            }
                          }
                        }
                      },
                  labels: ['Excellent', 'Good', 'Average', 'Satisfactory', 'Poor'],
                  colors: ['#14ab4c', '#b2cc83', '#fbe17d', '#f7711c', '#f74c40'],
                  radialBar: {
                  }
                },
                series: [],
            },

            processSummary2: {
                options: {
                    plotOptions: {
                        radialBar: {
                          offsetY: -10,
                          startAngle: 0,
                          endAngle: 360,
                          hollow: {
                            margin: 0,
                            size: '20%',
                            background:'transparent',
                            image: undefined,
                          },
                          dataLabels: {
                            name: {
                              show: false,
          
                            },
                            value: {
                              show: false,
                            }
                          }
                        }
                      },
                  labels: ['Excellent', 'Good', 'Average', 'Satisfactory', 'Poor'],
                  colors: ['#14ab4c', '#b2cc83', '#fbe17d', '#f7711c', '#f74c40'],
                  radialBar: {
                  }
                },
                series: [],
            },

            processSummary3: {
                options: {
                    plotOptions: {
                        radialBar: {
                          offsetY: -10,
                          startAngle: 0,
                          endAngle: 360,
                          hollow: {
                            margin: 0,
                            size: '20%',
                            background:'transparent',
                            image: undefined,
                          },
                          dataLabels: {
                            name: {
                              show: false,
          
                            },
                            value: {
                              show: false,
                            }
                          }
                        }
                      },
                  labels: ['Excellent', 'Good', 'Average', 'Satisfactory', 'Poor'],
                  colors: ['#14ab4c', '#b2cc83', '#fbe17d', '#f7711c', '#f74c40'],
                  radialBar: {
                  }
                },
                series: [],
            },

            processSummary4: {
                options: {
                    plotOptions: {
                        radialBar: {
                          offsetY: -10,
                          startAngle: 0,
                          endAngle: 360,
                          hollow: {
                            margin: 0,
                            size: '20%',
                            background:'transparent',
                            image: undefined,
                          },
                          dataLabels: {
                            name: {
                              show: false,
          
                            },
                            value: {
                              show: false,
                            }
                          }
                        }
                      },
                  labels: ['Excellent', 'Good', 'Average', 'Satisfactory', 'Poor'],
                  colors: ['#14ab4c', '#b2cc83', '#fbe17d', '#f7711c', '#f74c40'],
                  radialBar: {
                  }
                },
                series: [],
            }
        }
    }
    componentWillReceiveProps(nextProps){
      if(this.props.gridData !== nextProps.gridData){
        this.setState({ gridData: nextProps.gridData })
      }
    }
    toggle = async (functionId, phaseId) => {
      console.log(functionId, phaseId);
      //this.functionPhaseAsgn(functionId, phaseId);
      this.setState(prevState => ({
          isOpen: !prevState.isOpen,
          gridData: ""
      }), async function() {
        if(this.state.isOpen) {
          this.props.fetchFunctionalGrid(functionId, phaseId);
        }
      })
  }
  functionPhaseAsgn(functionId, phaseId){
    this.getSpiralReport(this.props.projectId,functionId,phaseId);
    this.setState({
      fid:functionId,
      pid:phaseId
    });

  }
    async getAverageReport(projectId) {
      const headers = {
        "authorization": "Bearer " + CacheStorage.getItem("userToken")
      }
      await axios.get(config.laravelBaseUrl+'get_average_score/'+projectId, {
        headers: headers
      })
      .then(res => {
        const data = res.data.data;
        console.log(data['functions']);
        this.setState({
          projectName: data['projectName'],
          averageScore: data['score'],
          functions: data['functions']
        })
      }); 
    }

    async getSpiralReport(projectId,fid,pid) {
        const headers = {
          "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        await axios.get(config.laravelBaseUrl+'get_spiral_report/'+projectId+'/'+fid+'/'+pid, {
          headers: headers
        })
        .then(res => {
          let fname = res.data.data.FunctionName.FunctionName;
          let pname = res.data.data.PhaseName.PhaseName;
          this.setState({
            fname: fname,
            pname: pname
          });
          const data = res.data.data;
          var seriesData0 = [];
          var seriesData1 = [];
          var seriesData2 = [];
          var seriesData3 = [];
          var seriesData4 = [];

          var labelData0 = [];
          var labelData1 = [];
          var labelData2 = [];
          var labelData3 = [];
          var labelData4 = [];

          for(let i=0; i<5; i++)
          {
            for(let j = 0; j<data[i].length; j++)
            {
                if(i === 0)
                {
                    seriesData0.push(Math.round(data[0][j].Percentage));
                    labelData0.push(data[0][j].ProcessStatus);
                }else if(i === 1)
                {
                    seriesData1.push(Math.round(data[1][j].Percentage));
                    labelData1.push(data[0][j].ProcessStatus);
                }else if(i === 2)
                {
                    seriesData2.push(Math.round(data[2][j].Percentage));
                    labelData2.push(data[0][j].ProcessStatus);
                }else if(i === 3)
                {
                    seriesData3.push(Math.round(data[3][j].Percentage));
                    labelData3.push(data[0][j].ProcessStatus);
                }else if(i === 4)
                {
                    seriesData4.push(Math.round(data[4][j].Percentage));
                    labelData4.push(data[0][j].ProcessStatus);
                }
                
            }
          }
          // this.setState({
          //   processSummary0: {
          //     options: {
          //       labels: ["q","q","f","g","v"]
          //     },
          //     series: seriesData0
          //   }
          // })

          let newProcess0 = {options: {
            labels: labelData0
          }, series: seriesData0}

          let newProcess1 = {options: {
            labels: labelData1
          }, series: seriesData1}

          let newProcess2 = {options: {
            labels: labelData2
          }, series: seriesData2}

          let newProcess3 = {options: {
            labels: labelData3
          }, series: seriesData3}

          let newProcess4 = {options: {
            labels: labelData4
          }, series: seriesData4}

          this.setState(prevState => ({
            processSummary0: {  
                ...prevState.processSummary0,
                ...newProcess0,    // update the value of specific key
            },
            processSummary1: {                   // object that we want to update
                ...prevState.processSummary1,    // keep all other key-value pairs
                ...newProcess1,    // update the value of specific key
            },
            processSummary2: {                   // object that we want to update
                ...prevState.processSummary2,    // keep all other key-value pairs
                ...newProcess2,    // update the value of specific key
            },
            processSummary3: {                   // object that we want to update
                ...prevState.processSummary3,    // keep all other key-value pairs
                ...newProcess3    // update the value of specific key
            },
            processSummary4: {                   // object that we want to update
                ...prevState.processSummary4,    // keep all other key-value pairs
                ...newProcess4   // update the value of specific key
            }
          }))
          //console.log(this.state.processSummary0);
          //console.log(newProcess0);

        //   this.setState(prevState => ({
        //     processSummary: {                   // object that we want to update
        //         ...prevState.processSummary,    // keep all other key-value pairs
        //         series: series      // update the value of specific key
        //     }
        //   }))
        //   console.log(res);
        }); 
    }

    componentWillMount() {
      this.getAverageReport(this.props.projectId);
      //this.getSpiralReport(this.props.projectId);
    }

    render() {
        let processReports = [];
            var processSummary;
            if(this.state.fid !== undefined && this.state.pid !== undefined){
            for(var i=0; i<5; i++)
            {
              if(i === 0)
              {
                processSummary = this.state.processSummary0;
              }else if(i === 1)
              {
                processSummary = this.state.processSummary1;
              }else if(i === 2)
              {
                processSummary = this.state.processSummary2;
              }else if(i === 3)
              {
                processSummary = this.state.processSummary3;
              }else if(i === 4)
              {
                processSummary = this.state.processSummary4;
              }
              
              processReports.push(<Col sm="12" md="6" lg="6" xl="3" className="pr-0 mb-3 width20-percent" key={'processReport-'+i+1}>
                  <div className="bg-white1">
                      <h3>L{i+1} Processes
                          <div className="dropdown float-right">
                              <a href="#" data-toggle="dropdown"><i className="fas fa-ellipsis-v"></i></a>
                              <div className="dropdown-menu">
                                  <a className="dropdown-item" href="#">Change View</a>
                                  <div className="dropdown-divider"></div>
                                  <a className="dropdown-item" href="#">Export to Excel</a>
                              </div>
                          </div>
                      </h3>
                      <div className="text-center mt-3 mb-0">
                          <ReactApexChart options={processSummary.options} series={processSummary.series} type="radialBar" height="300" />
                      </div>
                      <div className="d-flex">
                          <div className="rating">
                              <p><span className="dot excellent"></span> <span className="value-data">{processSummary.series[0]}%</span><br /><span className="posrelative-span">Excellent</span></p>
                          </div>
                          <div className="rating">
                              <p><span className="dot good"></span> <span className="value-data">{processSummary.series[1]}%</span><br /><span className="posrelative-span">Good</span></p>
                          </div>
                          <div className="rating">
                              <p><span className="dot average"></span> <span className="value-data">{processSummary.series[2]}%</span><br /><span className="posrelative-span">Average</span></p>
                          </div>
                          <div className="rating">
                              <p><span className="dot satisfactory"></span><span className="value-data">{processSummary.series[3]}%</span><br /><span className="posrelative-span">Satisfactory</span></p>
                          </div>
                          <div className="rating">
                              <p><span className="dot poor"></span><span className="value-data">{processSummary.series[4]}%</span><br /><span className="posrelative-span">Poor</span></p>
                          </div>
                      </div>
                  </div>
              </Col>);  
            }
          }

            let optReport = <></>;
            let allScore = <></>;
            let functions = this.state.functions;
            if(this.state.functions != undefined){
              optReport = functions.map((report, i) => {
                
                return (
                  <div className="weighted-box" key={'funcPhaseGridItem-'+i}>
                      <p>{report}</p>
                  </div>
                )              
              })
              
              let scores = this.state.averageScore;
              console.log(scores);
              allScore = scores.map(phase => {               
                     
                      return(
                        <div className="weighted-row1" key={'functionPhaseGridItem-'+phase.PhaseID}>
                          <div className="weighted-box">
                              <p className="vert-text">{phase.key}</p>
                          </div>
                          
                            {
                              phase.scoreData.map((val,i) => {  
                                let rating = Math.ceil(val.score);
                                let bgClassName = " bg-nil";
                                if (rating === 5) {
                                  bgClassName = " bg-excellent";
                                } else if (rating === 4) {
                                  bgClassName = " bg-good";
                                } else if (rating === 3) {
                                  bgClassName = " bg-average";
                                } else if (rating === 2) {
                                  bgClassName = " bg-satisfactory";
                                }else if(rating == 1){
                                  bgClassName = " bg-poor";
                                }
                                
                                // let bgClassName = "";
                                // if(i == 0){
                                //   bgClassName = "bg-green";
                                // }else if(i == 1){
                                //   bgClassName = "bg-yellow";
                                // }else if(i == 2){
                                //   bgClassName = "bg-red";
                                // }else if(i == 3){
                                //   bgClassName = "bg-orange";
                                // }
                                let score =  "";
                                if(Math.ceil(val.score) > 0){
                                  score = parseFloat(val.score).toFixed(2);
                                }else{
                                  score = "Not Scored";
                                }
                                if(score !== 'Not Scored'){
                                  return(
                                    <div className={ 'weighted-box '+bgClassName } onClick={() => {this.toggle(val.FunctionID, phase.PhaseID); this.functionPhaseAsgn(val.FunctionID, phase.PhaseID) }} key={'phaseGrid-'+phase.PhaseID+val.FunctionID}>
                                    <p style={{color:'#000'}}>{score}</p>
                                    </div>
                                  )
                                }else{
                                  return(
                                    <div className={ 'weighted-box '+bgClassName } key={'phaseGrid-'+phase.PhaseID+val.FunctionID}>
                                      <p style={{color:'#ff786e'}}>{score}</p>
                                    </div>
                                  )
                                }
                              })
                            }
                              
                          
                        </div>
                      )
                  
                  
              })
            }
            let gridRows = [];
            if(this.state.gridData) {
              gridRows = this.state.gridData.map((gridItem, key) => {
                let Level1_Calc_Aggr_Score = "";
                let Ranking = "";
                if(gridItem.Level1_Calc_Aggr_Score == ".00" || gridItem.Level1_Calc_Aggr_Score == "0"){
                  Level1_Calc_Aggr_Score = "N/A";
                  Ranking = "N/A";
                }else{
                  Level1_Calc_Aggr_Score = parseFloat(gridItem.Level1_Calc_Aggr_Score).toFixed(2);
                  Ranking = '#'+gridItem.Ranking;
                }
                let barWidth = (100/5)*parseFloat(gridItem.Level1_Calc_Aggr_Score)+'%';
                let barColor = '#60B07D';
                if(gridItem.Level1_Calc_Aggr_Score >= 0 && gridItem.Level1_Calc_Aggr_Score < 1) {
                  barColor = '#EC736C';
                }else if(gridItem.Level1_Calc_Aggr_Score >= 1 && gridItem.Level1_Calc_Aggr_Score < 2) {
                  barColor = '#F2AC78';
                }else if(gridItem.Level1_Calc_Aggr_Score >= 2 && gridItem.Level1_Calc_Aggr_Score < 3) {
                  barColor = '#FCE686';
                }else if(gridItem.Level1_Calc_Aggr_Score >= 3 && gridItem.Level1_Calc_Aggr_Score < 4) {
                  barColor = '#B2CC83';
                }
                return (
                  <tr key={'gridItem-'+key}>
                    <td>{gridItem.ProcessLevel1Title}</td>
                    <td>
                      {Level1_Calc_Aggr_Score}
                      <div className="scoreBar" style={{backgroundColor: barColor, width: barWidth}}></div>
                    </td>
                    <td>{Ranking}</td>
                  </tr>
                )
              });
            }
        return (
            <div className="bg-white1 report-capability-sec">
                <div className="top-heading top-heading-padding-control">
                    <h1 className="heading heading-weighte-avg">Weighted Average for "{this.state.projectName}" - Project </h1>

                    <div className="dropdown">
                    <a href="#" data-toggle="dropdown"><i className="fas fa-ellipsis-v"></i></a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Change View</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Export to Excel</a>
                    </div>
                    </div>
                </div>

                <div className="weighted-average-sec">
                    <div className="weighted-row">
                    <div className="weighted-box">
                        &nbsp;
                    </div>
                    {optReport}
                    </div>
                    {allScore}
                </div>
                <div className="top-heading d-block Lprocesses mt-4 pt-1">
                    <h2 className="heading" style={{display: (processReports.length > 0) ? "block" : "none"}}>Process Summary - {this.state.fname} / {this.state.pname}</h2>
                    <h2 className="heading" style={{display: (processReports.length > 0) ? "none" : "block"}}>Process Summary </h2><br/>
                    <div className="alert alert-secondary" role="alert" style={{display: (processReports.length > 0) ? "none" : "block"}}>
                    <h2 className="heading fisie18"><i className="fa fa-info-circle" aria-hidden="true"></i> Please Click on a L1 Process to get the Process Summary </h2></div>
                </div>
                <Row className="mb-3 Lprocesses">
                    {processReports}
                </Row>
                <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle} title="View Processes & Ranking" onSave={() => {}} className="reportModal modal-lg" footer={false}>
                  <div className="row">
                      <div className="col-sm-12">
                          <table className="table table-striped table-bordered popup-tabledata">
                            <thead valign="center"> 
                              <tr>
                                <th>Process</th>
                                <th>Scoring</th>
                                <th>Overall Ranking in<br/>Decomposition Model</th>
                              </tr>
                            </thead>
                            <tbody>
                              {gridRows}
                            </tbody>
                          </table>
                      </div>
                  </div>
              </ModalPopup>
            </div>
        )
    }
}

export default ReportGrid;