import React from "react";
import { BoxWrapper } from "./dashboardBoxStyling";
import graph from "../../../../common/images/graph.png";
const config = require('../../../../config');
export default class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let bgClass = "card border-left-primary shadow h-100 py-2 text-white ";
    let score = "";
    let AMprojectsLists = this.props.AMdata.map((project, i) => {
        return (
            <li onClick={() => this.props.getAMPercentage(project.BenchmarkProjectID)} value={project.BenchmarkProjectID} key={'projectOpt-'+project.BenchmarkProjectID}>{project.BenchmarkProjectName}</li>
        )
    })

    let CMProjectsLists = [];
      if(this.props.CMdata.length > 0 ) {
        CMProjectsLists = this.props.CMdata.map((project, i) => {
              let uniqId = project.ProjectName.trim() + '-'+ i;
              return (
                  <li onClick={() => this.props.getCMPercentage(project.DecompositionProjectID)} value={project.DecompositionProjectID} key={uniqId}>{ project.ProjectName }</li>
              )
          })
      }
    return (
      <BoxWrapper className="row">
        {this.props.highlight
          ? this.props.highlight.map(item => {
              /*(function() {
                switch (item.DashboardHighlightsName) {
                  case "Transformation Journey Complete":
                    bgClass =
                      "card border-left-primary shadow h-100 py-2 text-white bg-danger";
                    score = "8%";
                    break;
                  case "Transformation Journey In Progress":
                    bgClass =
                      "card border-left-primary shadow h-100 py-2 text-white bg-warning";
                    score = "20%";
                    break;
                  case "Transformation Journey Not Started":
                    bgClass =
                      "card border-left-primary shadow h-100 py-2 text-white bg-primary";
                    score = "72%";
                    break;
                  default:
                    break;
                }
              })();*/
              return (
                <div
                  key={item.DashboardHighlightsID}
                  className="col-xl-4 col-md-6 mb-4 box-sec-1"
                >
                  {/* <div className={bgClass}> */}
                  <div className={'card border-left-primary shadow h-100 py-2 text-white ' + item.Color}>
                    <div className="card-body">
                      <div className="btn-group float-right">
                        <button
                          className="btn btn-transparent dropdown-toggle text-white p-0"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fa fa-cog"></i>
                        </button>
                        
                          {
                            item.DashboardHighlightsName == 'AmpMarking Progress' ?
                            <div className="dropdown-menu dropdown-menu-right">
                              <ul  className="dashdrop">{AMprojectsLists}</ul>
                            </div>
                            : item.DashboardHighlightsName == 'Capability Modeling Progress' ?
                            <div className="dropdown-menu dropdown-menu-right">
                              <ul className="dashdrop">{CMProjectsLists}</ul>
                            </div>
                            :
                            <div className="dropdown-menu dropdown-menu-right">
                              <ul className="dashdrop">Not Available</ul>
                            </div>
                          }
                        
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          {
                            item.DashboardHighlightsName == 'AmpMarking Progress' ?
                              <div className="h5 mb-0 font-weight-bold">{ (this.props.AMPercentageValue!=null) ? this.props.AMPercentageValue : '0.00' }%</div>
                            : item.DashboardHighlightsName == 'Capability Modeling Progress' ?
                              <div className="h5 mb-0 font-weight-bold">{ (this.props.CMPercentageValue!=null) ? this.props.CMPercentageValue : '0.00' }%</div>
                            :
                              <div className="h5 mb-0 font-weight-bold">0.00%</div>
                          }
                          
                          
                          <div className="text-xs mb-1">
                            {item.DashboardHighlightsName + " "}
                          </div>
                        </div>
                      </div>
                      <div className="chart-wrapper card-graph">
                        <img className="img-fluid" src={graph} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </BoxWrapper>
    );
  }
}
