/* eslint-disable */
import React from "react";
import login_image from "../../../../common/images/login_image.png";

const newsImages = [
  require('../../../../common/images/thumb1.png'),
  require('../../../../common/images/thumb2.png'),
  require('../../../../common/images/thumb3.png'),
  require('../../../../common/images/thumb4.png')
]

import { NewsWrapper } from "./newsSectionStyling";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

export default class NewsSection extends React.Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    console.log(this.state.activeIndex);
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
    this.items = this.props.newsResource ? this.props.newsResource : [];
    return (
      <NewsWrapper>
      <div className="card industry-news-sec mb-3">
        <div className="card-header">
          <h5>
            <i className="fa fa-align-justify"></i> Industry News
          </h5>
        </div>

        <div className="card-body">
          {this.items.length?
          [
          <Carousel
            activeIndex={this.state.activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={this.items}
              activeIndex={this.state.activeIndex}
              onClickHandler={this.goToIndex}
            />
            {this.items.map((item, index) => {
             
              return(
              <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.DashboardIndustryNewsID}
              >
                <a href={ item.IndustryNewsURLPath } target="_blank"><img
                  src={ (item.IndustryNewsDigitalAsset!=null) ? item.IndustryNewsDigitalAsset : newsImages[0] }
                  className="d-block w-100 carousel-image"
                  alt={item.altText}
                  key={index}
                /></a>
                <CarouselCaption
                  className="carousel-caption d-none d-md-block latest-news industry-news-bgoverlay"
                  captionText={item.IndustryNews}
                  captionHeader={item.DashboardIndustryNewsName}
                />
              </CarouselItem>
              )
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
          </Carousel>,      
          <div className="industry-news">
            <div className="row">
              {this.items.map((item, index) => (
                <div key={index} className="column industry-news-bottom" onClick={()=>this.goToIndex(index)}>
                  <img key={index} src={ (item.IndustryNewsDigitalAsset!=null) ? item.IndustryNewsDigitalAsset : newsImages[0] } className="industry-news-image" />
                </div>
              ))}
            </div>
          </div>]
          :<p>Sorry No Items Found</p>}
        </div>
        </div>

      </NewsWrapper>
    );
  }
}
