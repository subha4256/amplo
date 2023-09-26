import React from 'react';
import { Row, Container } from 'reactstrap';
const Testimonials = (props) => {
    return (
        <section className="sec-padding testimonial-sec">
			<Container>
				<Row className="text-center">
					<h2 className="w-100">Testimonials</h2>
					<div className="heading-divider w-100"><span></span></div>
				</Row>
				<Row className="mt-5">
					<div id="testimonialcarousel" className="carousel slide" data-ride="carousel">
						<ol className="carousel-indicators">
							<li data-target="#testimonialcarousel" data-slide-to="0" className="active"></li>
							<li data-target="#testimonialcarousel" data-slide-to="1"></li>
						</ol>
						<div className="carousel-inner bg-white" role="listbox">
							<div className="carousel-item bg-white active text-center">
								<div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed.</p>
								</div>
								<div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed.</p>
								</div>
								<div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed.</p>
								</div>
							</div>
                            <div className="carousel-item bg-white text-center">
								<div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed.</p>
								</div>
								<div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed.</p>
								</div>
								<div>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed.</p>
								</div>
							</div>
						</div>                    
					</div>
				</Row>
			</Container>
		</section>
    )
}

export default Testimonials;