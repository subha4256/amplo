import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Culture from "./templates/Culture";
import Knowledge from "./templates/Knowledge";
import Processes from "./templates/Processes";
import Strategy from "./templates/Strategy";
import Technology from "./templates/Technology";
import GoalSetting from "./templates/GoalSetting";
import { QuizWrapper } from "./Styling/Questionaire";
import {
    getAflyScore,
    getAflyDomainScore,
} from "../../actions/benchmarkingActions";
import { Global } from "../../utils/Env";
import GoalSettingMain from "./templates/GoalSettingMain";
class Quiz extends Component {
    constructor(props) {
        super(props);

        // Global.callback.getAflyScore_onComplete = ({data}) => {
        //     let obj = {
        //         BMProjectId : this.props.projId,
        //         IndustryLeaderName : data[0].Name
        //     }
        //     this.props.getAflyDomainScore(obj)
        // }
    }
    componentWillReceiveProps(nextProps, prevState) {
        console.log("Next props", nextProps);
    }
    render() {
        let template = "culture";
        let renderQuestion = <></>;
        if (this.props.quizDone) {
            template = "goal-setting";
            renderQuestion = (
                <GoalSettingMain
                    resetValidate={this.props.resetValidate}
                    show={this.props.show}
                    validate={this.props.validate}
                    items={this.props.items}
                    projName={this.props.projName}
                    lock={this.props.lock}
                    domains={this.props.domains}
                    onNext={this.props.onNext}
                    projId={this.props.projId}
                />
            );
        } else {
            template = this.props.question.DesignChoice;
            console.log("Deep_template",template);
            //console.log(this.props.question);
            if (
                this.props.totalDomainQuestions &&
                this.props.totalDomainQuestions > 0
            ) {
                renderQuestion = <></>;
                if (template == "knowledge") {
                    renderQuestion = (
                        <Culture
                            access={
                                this.props.domain
                                    ? this.props.domain.AccessType
                                    : "read"
                            }
                            lock={this.props.lock}
                            question={this.props.question}
                            number = {this.props.number}

                            currentQuesIndex={this.props.currentQuesIndex}
                            onNext={this.props.onNext}
                            handleSelectedOption={
                                this.props.handleSelectedOption
                            }
                        />
                    );
                } else if (template == "technology") {
                    renderQuestion = (
                        <Knowledge
                            access={
                                this.props.domain
                                    ? this.props.domain.AccessType
                                    : "read"
                            }
                            lock={this.props.lock}
                            number = {this.props.number}

                            question={this.props.question}
                            currentQuesIndex={this.props.currentQuesIndex}
                            onNext={this.props.onNext}
                            handleSelectedOption={
                                this.props.handleSelectedOption
                            }
                        />
                    );
                } else if (template == "processes") {
                    renderQuestion = (
                        <Processes
                            access={
                                this.props.domain
                                    ? this.props.domain.AccessType
                                    : "read"
                            }
                            lock={this.props.lock}
                            number = {this.props.number}

                            question={this.props.question}
                            currentQuesIndex={this.props.currentQuesIndex}
                            onNext={this.props.onNext}
                            handleSelectedOption={
                                this.props.handleSelectedOption
                            }
                        />
                    );
                } else if (template == "culture") {
                    renderQuestion = (
                        <Strategy
                            access={
                                this.props.domain
                                    ? this.props.domain.AccessType
                                    : "read"
                            }
                            lock={this.props.lock}
                            question={this.props.question}
                            number = {this.props.number}
                            currentQuesIndex={this.props.currentQuesIndex}
                            onNext={this.props.onNext}
                            handleSelectedOption={
                                this.props.handleSelectedOption
                            }
                        />
                    );
                } else if (template == "strategy") {
                    renderQuestion = (
                        <Technology
                            access={
                                this.props.domain
                                    ? this.props.domain.AccessType
                                    : "read"
                            }
                            lock={this.props.lock}
                            number = {this.props.number}

                            question={this.props.question}
                            currentQuesIndex={this.props.currentQuesIndex}
                            onNext={this.props.onNext}
                            handleSelectedOption={
                                this.props.handleSelectedOption
                            }
                        />
                    );
                }
            } else {
                renderQuestion = (
                    <h3 style={{ textAlign: "center", width: "68%" }}>
                        No Questions found for this Domain. <br /> Please select
                        different domain from domain list{" "}
                    </h3>
                );
            }
        }

        console.log("Quaz =>", this.props)

        return (
            <QuizWrapper>
                <Row className="domain-slider-sec mt-4 mb-4">
                    <Col md="12" lg="12" xl="8">
                        <ul className="list-inline heading-list">
                            <li className={this.props.quizDone ? "d-flex" : ""}>
                                {!this.props.quizDone ? (
                                    <h2>
                                        {this.props.domain
                                            ? this.props.domain.DomainName
                                            : ""}
                                    </h2>
                                ) : (
                                    <>
                                        <h2>Goal Setting</h2>
                                        {/* <a style={{paddingTop:"2%",marginLeft:"47px", fontSize:"16px"}} href="#" onClick={()=>this.props.getAflyScore(this.props.projId)}>Get Benchmark Data</a> */}
                                    </>
                                )}
                            </li>
                            {!this.props.quizDone ? (
                                <li className="sm-txt">
                                    <small>Progress</small>
                                    <span>
                                        {/* {this.props.totalDomainQuestions > 0
                                            ?   this.props.currentQuesIndex + 1
                                            : 0}
                                        /{this.props.totalDomainQuestions} */}
                                         {this.props.totalDomainQuestions > 0
                                            ?   this.props.number
                                            : 0}
                                        /{this.props.totalDomainQuestions}
                                    </span>
                                 
                                </li>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </Col>
                    {renderQuestion}
                </Row>
            </QuizWrapper>
        );
    }
}
Quiz.propTypes = {
    quizDone: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
    domains: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getAflyScore, getAflyDomainScore })(
    Quiz
);
