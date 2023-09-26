import React from "react";
import { ScrippsStrategicGoalsWrapper } from "./scrippsStrategicGoalsStyling";
// import cloud from "../../../../common/images/cloud.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default class ScrippsStrategicGoals extends React.Component {
  constructor(props) {
    super(props);
  }

  createMarkup(value) {
    return { __html: value };
  }

  render() {
    this.items = [
        {
            heading: "Creating Value and Increasing Our Relevancy",
            desc: "<p><strong>Reduce cost and increase our competitive position</strong> in the San Diego market.</p><p><strong>Build ambulatory </strong>services – transition of care and chronic disease management. </p><p><strong>Enhance the revenue</strong> potential of retail and specialty pharmacies. </p><p>Establishing the <strong>AP pharmacist role </strong>in all settings.</p> <p> Provide Clinical Pharmacists and Specialists for <strong>direct patient care</strong> in collaboration with Physicians and Nursing. </p><p>Encouraging and supporting our clinicians to <strong>become Board Certified</strong> and expand the presence of Clinical Pharmacist Specialists and/or Advance Practice Pharmacists</p><p><strong>Elevate</strong> the role of the technician to perform at top of license.</p>"
        },
        {
            heading: "Year 1 Goals (Strategic)",
            desc: "<p>Conversion of Pyxis to Omnicell </p><p>Expand 340B program </p><p>Expand clinical services </p><p>$10 million savings goal</p>"
        },
        {
            heading: "Year 3 Goals (Strategic)",
            desc: "<p>Mobile Pharmacist Liaisons Pharmacist Clinics </p><p>Pharmacy Technician Role Expansion </p><p>Pharmacy Community Outreach </p><p>Centralized Dispensing and Cabinet Replenishment </p>"
        },
        {
            heading: "Year 5 Goals (Strategic)",
            desc: "<p>Continued Expansion of Pharmacies Role in the Clinics </p><p>340B Optimizations </p><p>Revenue Expansion </p><p>Continued Drive Towards Pharmacy Operations & Clinical Excellence</p>"
        }
    ]
  let settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 15000,
  }

    return (
      <ScrippsStrategicGoalsWrapper style={{height: "100%"}}>
        <div className="card strategic-goals mb-3">
          <div className="card-body">
            <h5>Scripps Strategic Goals</h5>
            <Slider {...settings} >
              {
                this.items.map((item,index) => (  
                      <div className="carousel-item active">
                          <div className="media align-items-center mt-3">
                              <img src={ require('../../../../common/images/scripps_logo.svg') } className="strategicgoals align-self-center mr-3" />
                              <div className="media-body strategicgoals-media">
                                  <h6>{item.heading}</h6>

                              </div>
                          </div>
                          <div className="strategic-content mt-3 mb-4">
                              <div dangerouslySetInnerHTML={this.createMarkup(item.desc)} />
                          </div>
                      </div>
                  )
                )
              }
            </Slider>

          </div>
        </div>
      </ScrippsStrategicGoalsWrapper>
    );
  }
}
