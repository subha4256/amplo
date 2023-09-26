import React from 'react';
import { Row, Col, Card, CardBody, CardText, Container } from 'reactstrap';
const WhyDiva = (props) => {
    return (
        <>
            <section className="sec-padding product-sec" id="why-diva">
                <Container>
                    <div className="row text-center">
                        <h2 className="w-100">Why AmploFly 4.0 Product?</h2>
                        <div className="heading-divider w-100"><span></span></div>
                    </div>
                    <Row className="mt-5">
                        <div className="card-deck">
                            <Card>
                                <CardBody>
                                    <img className="card-img-top img-fluid" src={ require('../../common/images/benchmark.png') } alt="" />
                                    <CardBody className="bg-green">
                                        <h4 className="card-text">Benchmark with Industry Data</h4>
                                    </CardBody>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <img className="card-img-top img-fluid" src={ require('../../common/images/cloud1.png') } alt="" />
                                    <CardBody className="bg-blue">
                                        <h4 className="card-text">Enable Cloud Strategy</h4>
                                    </CardBody>

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <img className="card-img-top img-fluid" src={ require('../../common/images/digitalTrans.png') } alt="" />
                                    <CardBody className="bg-orange">
                                        <h4 className="card-text">Digital Transformation Roadmap</h4>
                                    </CardBody>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </section>
            <section className="sec-padding journeys-sec">
                <Container>
                    <Row className="text-center">
                        <h2 className="w-100">Industry Usecases/Journeys</h2>
                        <div className="heading-divider w-100"><span></span></div>
                    </Row>
                </Container>
                <Container>
                    <Row className="mt-5">
                        <ul className="nav nav-tabs nav-justified w-100">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#industry1">INDUSTRY USECASE 1</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#industry2">INDUSTRY USECASE 2</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#industry3">INDUSTRY USECASE 3</a>
                            </li>
                        </ul>
                        <div className="tab-content w-100 mt-5">
                            <div className="tab-pane active" id="industry1">
                                <Row>
                                    <Col sm="12" md="5" lg="5" className="industry-img">
                                        <img className="img-fluid" src={ require('../../common/images/usecase1.png') } alt="" />
                                    </Col>
                                    <Col sm="12" md="7" lg="7" className="industry-content">
                                        <h2 className="mb-3">Are you ready for Industry 4.0?</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed erat
                                            ac posuere. Sed et tristique nibh, consectetur sodales odio. Pellentesque eget
                                            consequat dolor. Morbi ut est eget erat fermentum pulvinar. Mauris eu mauris
                                            commodo, sodales nisl non, faucibus massa.
                                        </p>
                                        <div className="media mt-4">
                                            <img className="user-img mr-3 " src={ require('../../common/images/usecase1_persona.png') } alt="" />
                                            <div className="media-body border bg-white">
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus
                                                    sed erat ac posuere.
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="tab-pane fade" id="industry2">
                                <Row>
                                    <Col sm="12" md="5" lg="5" className="industry-img">
                                        <img className="img-fluid" src={ require('../../common/images/usecase1.png') } alt="" />
                                    </Col>
                                    <Col sm="12" md="7" lg="7" className="industry-content">
                                        <h2 className="mb-3">Are you ready for Industry 4.0?</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed erat
                                            ac posuere. Sed et tristique nibh, consectetur sodales odio. Pellentesque eget
                                            consequat dolor. Morbi ut est eget erat fermentum pulvinar. Mauris eu mauris
                                            commodo, sodales nisl non, faucibus massa.
                                        </p>
                                        <div className="media mt-4">
                                            <img className="user-img mr-3 " src={ require('../../common/images/usecase1_persona.png') } alt="" />
                                            <div className="media-body border bg-white">
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus
                                                    sed erat ac posuere.
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="tab-pane fade" id="industry3">
                                <Row>
                                    <Col sm="12" md="5" lg="5" className="industry-img">
                                    <img className="img-fluid" src={ require('../../common/images/usecase1.png') } alt="" />
                                    </Col>
                                    <Col sm="12" md="7" lg="7" className="industry-content">
                                    <h2 className="mb-3">Are you ready for Industry 4.0?</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed erat
                                        ac posuere. Sed et tristique nibh, consectetur sodales odio. Pellentesque eget
                                        consequat dolor. Morbi ut est eget erat fermentum pulvinar. Mauris eu mauris
                                        commodo, sodales nisl non, faucibus massa.
                                    </p>
                                    <div className="media mt-4">
                                        <img className="user-img mr-3 " src={ require('../../common/images/usecase1_persona.png') } alt="" />
                                        <div className="media-body border bg-white">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus
                                                sed erat ac posuere.
                                            </p>
                                        </div>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default WhyDiva;