import React,{useState} from 'react';
import DashboardHeader from '../includes/dashboardHeader/DashboardHeader';
import ReactApexChart from 'react-apexcharts';
import {ReEstablishAflyWrapper} from './Styling/ReEstablishAfly'
import NetDivisionChart from './NetDivisionChart';
import { connect } from 'react-redux';
import { getReportsData } from '../../actions/Reports';
import { confirmAlert } from 'react-confirm-alert';
import "../../../node_modules/react-confirm-alert/src/react-confirm-alert.css"
import config from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { responseMessage } from '../../utils/alert';



class ReEstablishAfly extends React.Component{
    constructor(props){
        super(props)
        this.state = {series: [{
        name: 'AmpMarking',
        data: [0.4,3.2,5.5,4.2]
      }, {
        name: 'Capability Modeling',
        data: [1.7,2.9,4.5,3.4]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        grid: {
          show: true,
          borderColor: '#90A4AE',
          strokeDashArray: 0,
          position: 'back',
          xaxis: {
              lines: {
                  show: true
              }
          },   
          yaxis: {
              lines: {
                  show: true
              }
          },  
          row: {
              colors: undefined,
              opacity: 0.5
          },  
          column: {
              colors: undefined,
              opacity: 0.5
          },  
          padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
          },  
      },

      colors:['#5C527F', '#3E2C41', ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '85%',
            // endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 4,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Strategy', 'Culture', 'Technology', 'Compliance'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
            // colors:["#cbdde6","#ededed"],
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      },
      categories : [],
      netDivisionData: [] ,
      tableData : [],
       Total_Deviation: "" ,
       Re_Established: "" ,
       inputScore: '',
       ComparisionProjectName: ""
    }
  
}


static getDerivedStateFromProps(nextProps,prevState) {

 
  // console.log(nextProps.reportsData)
  let objectReturn = {...prevState}

  const categories =  nextProps.reportsData.map( item => item.Ampmarking_Domain )
  
  const AMPlabelScore = nextProps.reportsData.map(item => (+item.Ampmarking_Domain_Count).toFixed(1))
  
  const CaplabelScore = nextProps.reportsData.map(item => (+item.Capability_Domain_Count).toFixed(1))

  const divisionScore = nextProps.reportsData.map(item => (+item.Net_Domain_Deviation).toFixed(2))
 
   let tableData = nextProps.reportsData.map(({ Ampmarking_Domain , Ampmarking_Domain_Count , Capability_Domain_Count , Gross_Deviation_Val , Net_Domain_Deviation ,Total_Deviation ,Reestablish_Score ,AmpMarkingName ,CapabilityModelingName , GrossDeviationName ,NetDomainDeviationName }) => ({ Ampmarking_Domain , Ampmarking_Domain_Count , Capability_Domain_Count , Gross_Deviation_Val , Net_Domain_Deviation ,Total_Deviation ,Reestablish_Score ,AmpMarkingName ,CapabilityModelingName , GrossDeviationName ,NetDomainDeviationName }))


  //  console.log("Table Data ==>" , tableData)

   const data = [{
  name: 'AmpMarking',
  data: AMPlabelScore
}, {
  name: 'Capability Modeling',
  data: CaplabelScore
}]

     objectReturn = {
       options: { 
            ...objectReturn.options ,
            xaxis: {
              categories
            }
       },
       series: data ,
       netDivisionData: divisionScore ,
       tableData,
       categories,
       Total_Deviation: nextProps.reportsData[0]?.Total_Deviation ,
       Re_Established:nextProps.reportsData[0]?.Reestablish_Score

     }

     return objectReturn;
}


componentDidMount() {
  this.props.getReportsData(this.props.match.params.projId)
  axios.get(`${config.laravelBaseUrl}GetCapabilityModelProjectLinkageWithAmpProjectName/${this.props.match.params.projId}`,
    {
      headers: {
          "authorization": "Bearer " + sessionStorage.getItem("userToken")
      }
   }).then(res => {
       console.log(res)
         this.setState({ ComparisionProjectName: res.data.data[0].ProjectName })
   }).catch(error => {}  )


}


   handleReEstablishedScore =()=> {
    confirmAlert({
      title: 'Confirmation',
      message: this.state.Re_Established <= 0 ? 'You want to Re-Establish Score?' : "The re-establish score already exists, do you want to re-establish it again",
      buttons: [
          {
              label: 'Yes',
              onClick: () => {
                
                axios.post(`${config.laravelBaseUrl}ReestablishAflyScore`,
                {
                  BenchmarkProjectID: this.props.match.params.projId,
                  ReestablishAsIsAflyScore: this.state.Re_Established
                } ,
                {
                  headers: {
                      "authorization": "Bearer " + sessionStorage.getItem("userToken")
                  }
               }).then((res)=>{
      
                  console.log(res)
                  if(res.data.success == true) {
                      responseMessage("success",
                      "Re-Establish Score update Successfuly..", )
                  }
                  this.setState({ inputScore: "" })
               })
              }
          },
          {
              label: 'No',
              onClick: () => {

              //
              }
          }
      ]
  });     
}


handleBack =()=>{
  this.props.history.push({
    pathname: '/benchmark-questionaire',
    state: { projId: this.props.match.params.projId , projName: this.props.match.params.name}
  })
}



render(){
    console.log(this.props)

  return(
    <>
    <DashboardHeader key="dashboard-header"/>
    <div id="wrapper" >
    <ReEstablishAflyWrapper id="content-wrapper" class="d-flex flex-column">
    <div id="content">
    <ol class="breadcrumb dashbread">
          <li class="breadcrumb-item active"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Reports</a></li>
          <li class="breadcrumb-item">Capability Modeling</li>
          <li class="breadcrumb-menu d-md-down-none ml-auto">
            <img src={ require('../../common/images/diva-icon.png') } class="logo-img" alt="Logo"/>
            <a class="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
          </li>
        </ol>
        <>
        <div class="container-fluid container-dashboard">
          <div class="row">
            <div className="col-1 col-md-1 ">
               <button onClick={this.handleBack} className="btn btn-sm btn-primary mt-3">Back</button>
            
            </div>
            <div class="col-sm-11 col-md-11 title d-flex justify-content-between align-items-center">
              <h1 className="text-bolder text-dark text-center">Report for Re-Establishing AFLY Score</h1>
                <div className="mt-1 mr-3">
              <p className="text-dark font-weight-bold my-0"> <span className="text-secondary">AmpMarking Project: </span>   {this.props.match.params.name}</p>
              <p className="text-dark font-weight-bold my-0"> <span className="text-secondary">Capability Project: </span>   {this.state.ComparisionProjectName}</p>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div class="bg-white afly">
                <h2 class="heading text-center ">Domain Scores</h2>
                <div class="report-chart">
                  {/* <img class="img-fluid" src="imgs/domain-scores.PNG" alt=""/> */}
                  <div id="chart">
                  <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div class="bg-white afly">
                <h2 class="heading text-center ">Net Deviation</h2>
                <div class="report-chart">
                    {/* <img class="img-fluid" src="imgs/net-deviation.PNG" alt=""/> */}
                     <NetDivisionChart  data = {this.state.netDivisionData} categorires = {this.state.categories}  />
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="bg-white afly">
                <h2 class="heading ">AFLY Score Re-Established</h2>
                <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-left">#</th>
                        {this.state.tableData?.map((item , i) =>(
                          <th key={`${item.Ampmarking_Domain + i}`} className="text-dark">{item?.Ampmarking_Domain}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td><strong>AmpMarking </strong></td>
                        {this.state.tableData?.map((item , i) =>(
                          <td key={`${item.Ampmarking_Domain_Count + i}`}><span class="text-right">{(+item.Ampmarking_Domain_Count).toFixed(1)}</span></td>
                        ))}
                      </tr>
                      <tr>
                        <td><strong>Capability Modeling </strong></td>
                        {this.state.tableData?.map((item , i) =>(
                          <td key={`${item.Capability_Domain_Count + i}`}><span class="text-right">{(+item.Capability_Domain_Count).toFixed(1)}</span></td>
                        ))}
                      </tr>
                      <tr>
                        <td><strong>Gross Deviation </strong></td>
                        {this.state.tableData?.map((item , i) =>(
                          <td key={`${item.Gross_Deviation_Val + i}`}><span class="text-right">{(+item.Gross_Deviation_Val).toFixed(1)}</span></td>
                        ))}
                      </tr>
                      <tr>
                        <td><strong>Net Domain Deviation </strong></td>
                        {this.state.tableData?.map((item , i) =>(
                          <td key={`${item.Net_Domain_Deviation + i}`}><span class="text-right">{(+item.Net_Domain_Deviation).toFixed(2)}</span></td>
                        ))}
                      </tr>
                    <tfoot>
                        <tr style={{background:'none'}} className="bg-light">
                            <td colspan="5">
                              <div class="d-flex " style={{width:'560px'}}>
                                 <div>Total Deviation :<strong>{this.state.Total_Deviation} </strong></div>
                                 <div class="ml-5">Re-Established Score : <strong> {this.state.Re_Established}</strong></div>
                              </div>
                            </td> 
                      </tr>
                    </tfoot>
                    </tbody>
                  </table>
                </div>

                <div class="text-right">
                    <button type="button" class="btn btn-success mt-2" onClick={this.handleReEstablishedScore} >Re-Establish Score</button>
                </div>
              </div>
            </div>
         </div>
         

        </div>
        </>
    </div>
        </ReEstablishAflyWrapper>
    </div>


     {/* POP MODEL FOR RE-ESTABLISH SCORE **** */}
    {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Re-Establish Score</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
          <div className="form-group">
            <label for="recipient-name" className="col-form-label">Score</label>
            <input onChange={(e) => this.setState({ inputScore: e.target.value })} type="number" className="form-control" id="recipient-name" placeholder="Score" />
          </div>
          </form>
      </div>
      <div className="modal-footer">
                  
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.handleReEstablishedScore} type="button" className="btn btn-success" data-dismiss="modal" disabled={!this.state.inputScore}>Save changes</button>
      </div>
    </div>
  </div>
</div> */}

    </>
)
}
}

const mapStateToProps = state => ({
  reportsData : state.reports.reports_data
})


export default connect(mapStateToProps , {getReportsData})(ReEstablishAfly);





