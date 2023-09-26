import React from "react";
import { AnnouncementWrapper } from "./announcementSectionStyling";
import cloud from "../../../../common/images/cloud.png";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

const announcementImages = [
  require('../../../../common/images/ic_aanoucements.png'),
  require('../../../../common/images/ic_BigData.png'),
  require('../../../../common/images/ic_ArtificialIntelligence.png'),
  require('../../../../common/images/ic_CloudStrategy.png')
]


export default class AnnouncementSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }
  render() {
    this.items = this.props.announcements ? this.props.announcements : [];

    return (
      <AnnouncementWrapper>
        <div className="card announcements-sec mb-3">
          <div className="card-body">
            <h5>Announcements</h5>
            {this.items.length?
            <Carousel
              activeIndex={this.state.activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                className="announcements-control"
                items={this.items}
                activeIndex={this.state.activeIndex}
                onClickHandler={this.goToIndex}
              />
              {this.items.map((item,index) => {

                return (
                <CarouselItem
                  onExiting={this.onExiting}
                  onExited={this.onExited}
                  key={item.DashboardAnnouncementID}
                >
                  <div className="media mt-3" style={{ minHeight: "144px" }}>
                    <a href={ item.DashboardAnnouncementURLPath } target="_blank"><img
                      src={ (item.DashboardAnnouncementDigitalAsset!=null) ? item.DashboardAnnouncementDigitalAsset : announcementImages[0] }
                      className="announcements align-self-center mr-3"
                      alt={item.altText}
                    /></a>
                    <div className="media-body announcement-media">
                      <h6>{item.DashboardAnnouncementHighlights}</h6>
                      <p>{item.DashboardAnnouncementSubHighlights}</p>
                    </div>
                  </div>
                </CarouselItem>)
              })}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
            :<p>Sorry No Items Found</p>}
          </div>
        </div>
      </AnnouncementWrapper>
    );
  }
}
