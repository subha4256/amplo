import React from "react";
import { WebinarWrapper } from "./webinarStyling";

export default class Webinar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let webTime = "";
    let webDesc = "";
    return (
      <WebinarWrapper className="col-sm-6 col-lg-3">
        <div className="card webinar-sec mb-3">
          <div className="card-body">
            <h5 className="mt-0">Recent Webinars </h5>

            {this.props.webinars && this.props.webinars.length
              ? this.props.webinars.map(webinar => {
                  
                  let endIndexOfEst =
                    webinar.DashboardWebinarDescription.indexOf("EST") + 2; //FINDING
                    
                  //THE END POSITION OF EST IN STRING
                  webTime = webinar.DashboardWebinarDescription.slice(
                    0,
                    endIndexOfEst + 1
                  ).trim();
                  webDesc = webinar.DashboardWebinarDescription.slice(
                    endIndexOfEst + 1
                  ).trim();
                  return (
                    <div className="webinar">
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                          width="360"
                          height="200"
                          src={ (webinar.DashboardWebinarURLPath!=null) ? webinar.DashboardWebinarURLPath : "https://www.youtube.com/embed/NPDLSEWXPhU?modestbranding=1&autohide=1&showinfo=0" }
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      
                      {/* <h6>{webTime}</h6> */}
                      <h5>{webinar.DashboardWebinarDescription}</h5>
                    </div>
                  );
                })
              : <p>Sorry No Items Found</p>}
            {this.props.webinars && this.props.webinars.length ? (
              <button
                className="btn btn-lg btn-primary text-center webinar-button"
                type="button"
              >
                View all Webinars
              </button>
            ) : null}
          </div>
        </div>
      </WebinarWrapper>
    );
  }
}
