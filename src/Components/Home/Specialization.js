import React from 'react';
import { Row, Col, Container } from 'reactstrap';
const Specialization = (props) => {
    return (
        <section className="top-sixbox-sec">
			<div className="container-fluid">
				<Row>
					<ul className="nav nav-tabs">
						<li className="nav-item bg-blue wow fadeInLeft" data-wow-delay="0.1s">
							<a className="nav-link active" data-toggle="tab" href="#tab1">
								<div><img src={ require('../../common/images/industrialM.png') } alt="" /></div>
								<div>
									<h3>Industrial Manufacturing</h3>
								</div>
							</a>
						</li>
						<li className="nav-item bg-green wow fadeInLeft" data-wow-delay="0.2s">
							<a className="nav-link" data-toggle="tab" href="#tab2">
								<div><img src={ require('../../common/images/consumerG.png') } alt="" /></div>
								<div>
									<h3>Consumer Goods</h3>
								</div>
							</a>
						</li>
						<li className="nav-item bg-light-green wow fadeInLeft" data-wow-delay="0.3s">
							<a className="nav-link" data-toggle="tab" href="#tab3">
								<div><img src={ require('../../common/images/retailD.png') } alt="" /></div>
								<div>
									<h3>Retail & Distribution</h3>
								</div>
							</a>
						</li>
						<li className="nav-item bg-yellow wow fadeInLeft" data-wow-delay="0.4s">
							<a className="nav-link" data-toggle="tab" href="#tab4">
								<div><img src={ require('../../common/images/pharma.png') } alt="" /></div>
								<div>
									<h3>Pharmaceuticals</h3>
								</div>
							</a>
						</li>
						<li className="nav-item bg-orange wow fadeInLeft" data-wow-delay="0.5s">
							<a className="nav-link" data-toggle="tab" href="#tab5">
								<div><img src={ require('../../common/images/medical.png') } alt="" /></div>
								<div>
									<h3>Medical Devices</h3>
								</div>
							</a>
						</li>
						<li className="nav-item bg-blue1 wow fadeInLeft" data-wow-delay="0.6s">
							<a className="nav-link" data-toggle="tab" href="#tab6">
								<div><img src={ require('../../common/images/hitech.png') } alt="" /></div>
								<div>
									<h3>Hi-Tech Manufacturing</h3>
								</div>
							</a>
						</li>
					</ul>
				</Row>
			</div>
			<Container className="pb-5">
				<div className="tab-content">
					<div className="tab-pane active" id="tab1">
						<Row>
							<Col sm="12" md="6" lg="6">
								<h2 className="mb-3">Industrial Manufacturing KPI with use of AmploFly 4.0</h2>
								<p>Make Industry 4.0 a reality in your operation with cutting-edge technology
									and
									applications
									built to solve your biggest industry challenges.
								</p>
								<ul className="ind-text">
									<li>Make Industry 4.0 a reality in your </li>
									<li>Make Industry 4.0 a reality in your </li>
									<li>Make Industry 4.0 a reality in your </li>
								</ul>
							</Col>
							<Col className="text-center" sm="12" md="6" lg="6">
								<img className="img-fluid" src={ require('../../common/images/usecase1.png') } alt="" />
							</Col>
						</Row>
					</div>
					<div className="tab-pane fade" id="tab2">
						<Row>
							<Col sm="12" md="6" lg="6">
								<h2 className="mb-3">Industrial Manufacturing KPI with use of AmploFly 4.0</h2>
								<p>Make Industry 4.0 a reality in your operation with cutting-edge technology
									and
									applications
									built to solve your biggest industry challenges.
								</p>
								<ul className="ind-text">
									<li>Make Industry 4.0 a reality in your </li>
									<li>Make Industry 4.0 a reality in your </li>
									<li>Make Industry 4.0 a reality in your </li>
								</ul>
							</Col>
							<Col className="text-center" sm="12" md="6" lg="6">
								<img className="img-fluid" src={ require('../../common/images/usecase1.png') } alt="" />
							</Col>
						</Row>
					</div>
				</div>
			</Container>
		</section>
    )
}

export default Specialization;