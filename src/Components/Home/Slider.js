import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Row,
	Col
   } from 'reactstrap';
class Slider extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const Background = require('../../common/images/banner1_bg.png');
		return (
			<section className="carousel slide" id="banner" data-ride="carousel" data-pause="false">
				<div className="carousel-inner">
					<div className="carousel-item active" style={{"backgroundImage":`url(${Background}`}}>
						<div className="banner-caption">
							<div className="container">
								<Row>
									<Col md="12" className="text-center">
										<h2 className="animated fadeInDown">AmploFly 4.0 tracks your Digital transformation with the
											power of Industry 4.0 </h2>
										<div>
											<img className="slide-img animated fadeInDown" src={ require('../../common/images/banner_subimage.png') }
												alt="" />
										</div>
										<Link to="/login" className="btn text-uppercase animated fadeInUp">GET STARTED</Link>
									</Col>
								</Row>
							</div>
						</div>
					</div>

					<div className="carousel-item" style={{"backgroundImage":`url(${Background}`}}>
						<div className="banner-caption">
							<div className="container">
								<div className="row">
									<div className="col-md-12 text-center">
										<h2 className="animated fadeInDown">AmploFly 4.0 tracks your Digital transformation with the
											power of Industry 4.0 </h2>
										<div><img className="slide-img" src={ require('../../common/images/banner_subimage.png') } alt="" /></div>
										<Link to="/login" className="btn text-uppercase animated fadeInUp">GET STARTED</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					<ol className="carousel-indicators">
						<li data-target="#banner" data-slide-to="0" className="active"></li>
						<li data-target="#banner" data-slide-to="1"></li>
						<li data-target="#banner" data-slide-to="1"></li>
						<li data-target="#banner" data-slide-to="1"></li>
					</ol>
					<a className="carousel-control-prev" href="#banner" role="button" data-slide="prev">
						<img src={ require('../../common/images/left_arrow_disabled.png') } alt="" />
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#banner" role="button" data-slide="next">
						<img src={ require('../../common/images/right_arrow.png') } alt="" />
						<span className="sr-only">Next</span>
					</a>
				</div>
			</section>
		)
	}
}

export default Slider;