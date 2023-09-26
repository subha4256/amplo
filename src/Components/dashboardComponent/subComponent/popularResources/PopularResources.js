import React from "react";
import {PopularWrapper} from "./popularResourcesStyling";
import cloud from "../../../../common/images/cloud.png";

const popularImages = [
  require('../../../../common/images/ic_BigData.png'),
  require('../../../../common/images/ic_ArtificialIntelligence.png'),
  require('../../../../common/images/ic_CloudStrategy.png'),
  require('../../../../common/images/ic_CloudSecurity.png')
]

export default class PopularResources extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      resources:[]
    }
  }
  componentDidUpdate(prevProps, prevState){
   
    if (prevProps.resources !== this.props.resources) {
      this.setState({ resources: this.props.resources });
    }
  }
  render() {
    return (
      <PopularWrapper>
      <div className="card popular-sec mb-5">
        <div className="card-body">
          <h5> Popular Resources</h5>
          <div className="row resources">
            {this.state.resources && this.state.resources.length?
            this.state.resources.map((resource,index)=>(
              <div className="col-md-3 col-lg-3 col-xs-12">
              <a href={ resource.DashboardPopularResourceURLPath } target="_blank">
                  <img key={index} src={ (resource.DashboardPopularResourceDigitalAsset!=null) ? resource.DashboardPopularResourceDigitalAsset : popularImages[0] } className="resources-img" />
              </a>
              <h5> {resource.DashboardPopularResourceHighlights}</h5>
            </div>
            )):<p>Sorry No Items Found</p>
            }
            
            
             
          </div>
        </div>
        </div>
      </PopularWrapper>
    );
  }
}
