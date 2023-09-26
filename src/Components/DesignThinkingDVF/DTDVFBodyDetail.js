import React, { Component } from "react";
import InputRange from "react-input-range";
import { Link } from "react-router-dom";
class DTDVFBodyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIdeaInd: -1,
            focus: "",
            totalSelected: [],
        };
    }
    handleOnChangeHandler(value, key, focus) {
        this.props.sliderValueChangeHandler(key, focus, value);
    }
    handleSliderChangeComplete(key) {
        this.props.handleSliderChangeComplete(
            key,
            this.state.idea[key],
            this.state.scoreType
        );
    }
    handleInputFocus = (key, type) => {
        this.setState({
            selectedIdeaInd: key,
            focus: type,
        });
    };

    render() {
        console.log("Total Ideas box", this.props);
        console.log("Total Ideas box", this.props.ideas);

        let ideaList = this.props.ideas.map((idea, key) => {
            return (
                <div className="row w-100" key={"ideaList-" + idea.id}>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3">
                        <div className="ideas-box">
                            <h3>{idea.title}</h3>
                            <p>{idea.description}</p>
                            <div className="votebtn">
                                <a href="#">{idea.votes} Votes</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9">
                        <div className="fourideas">
                            <div className="idealist">
                                {key === 0 ? (
                                    <h2 className="mb-5">Desirable</h2>
                                ) : null}
                                <input
                                    type="text"
                                    className="ideatxt activeinput"
                                    onFocus={() =>
                                        this.handleInputFocus(key, "desirable")
                                    }
                                    value={idea.desirable}
                                    onBlur={() => this.handleInputFocus(-1, "")}
                                />
                            </div>
                            <div className="idealist">
                                {key === 0 ? (
                                    <h2 className="mb-5">Viable </h2>
                                ) : null}
                                <input
                                    type="text"
                                    className="ideatxt"
                                    onFocus={() =>
                                        this.handleInputFocus(key, "viable")
                                    }
                                    value={idea.viable}
                                    onBlur={() => this.handleInputFocus(-1, "")}
                                />
                            </div>
                            <div className="idealist">
                                {key === 0 ? (
                                    <h2 className="mb-5">Feasible </h2>
                                ) : null}
                                <input
                                    type="text"
                                    className="ideatxt"
                                    onFocus={() =>
                                        this.handleInputFocus(key, "feasible")
                                    }
                                    value={idea.feasible}
                                    onBlur={() => this.handleInputFocus(-1, "")}
                                />
                            </div>
                            <div className="idealist">
                                {key === 0 ? (
                                    <h2 className="mb-5">Total Score </h2>
                                ) : null}
                                <input
                                    type="text"
                                    className="ideatxt"
                                    value={idea.totalScore}
                                    readOnly
                                    onFocus={() =>
                                        this.handleInputFocus(-1, "")
                                    }
                                />
                            </div>
                            <div className="idealist">
                                <div className="custom-control custom-checkbox mt-5">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={"ideacheck_" + idea.id}
                                        onChange={(e) =>
                                            this.props.publishIdeas(e, idea.id)
                                        }
                                        checked={
                                            this.props.totalSelected.includes(
                                                idea.id
                                            )
                                                ? true
                                                : null
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor={"ideacheck_" + idea.id}
                                    ></label>
                                </div>
                            </div>
                            <div className="domain-map">
                                {this.state.selectedIdeaInd == key ? (
                                    <InputRange
                                        maxValue={5}
                                        minValue={0}
                                        step={0.1}
                                        formatLabel={(value) => value}
                                        value={idea[this.state.focus]}
                                        onChange={(value) =>
                                            this.handleOnChangeHandler(
                                                value,
                                                key,
                                                this.state.focus
                                            )
                                        }
                                        disabled={
                                            this.props.isPublish.includes(
                                                idea.id
                                            )
                                                ? true
                                                : null
                                        }
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="dt-content-wrapper">
                <div className="content-wraper">
                    <div className="container-fluid">
                        <div className="row epic-version align-items-center">
                            <div className="col-sm-12 col-md-12 col-lg-8 pt-3 pl-0">
                                <h2 className="d-flex align-items-center">
                                    <span>Ideate - Generate Ideas </span>
                                    <select
                                        className="custom-select ml-3"
                                        value={this.props.selectedSubEpic}
                                        onChange={(e) =>
                                            this.props.changeSelectedSubEpic(
                                                e.target.value
                                            )
                                        }
                                    >
                                        {Object.keys(this.props.epics).length >
                                        0
                                            ? this.props.epics.EPic[0].SubEpic.map(
                                                  (subEpic) => {
                                                      return (
                                                          <option
                                                              key={
                                                                  "subEpic_" +
                                                                  subEpic.id
                                                              }
                                                              value={subEpic.id}
                                                          >
                                                              {subEpic.name}
                                                          </option>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </select>
                                    <Link
                                        to={`/dt-network-of-experience/${this.props.projectId}/${this.props.epicId}`}
                                        className="ml-3"
                                    >
                                        Network of Experience
                                    </Link>
                                </h2>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                                <ul className="list-inline pager-list mb-0">
                                    <li className="list-inline-item">
                                        <Link
                                            to={`/dt-swot-analysis/${this.props.projectId}/${this.props.epicId}`}
                                            className="ml-3"
                                        >
                                            Previous
                                        </Link>
                                    </li>{" "}
                                    |
                                    <li className="list-inline-item">
                                        <Link
                                            to={`/dt-prototype/${this.props.projectId}/${this.props.epicId}`}
                                        >
                                            Next
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row generate-ideas-row">
                            <div className="col-sm-12 col-md-12 col-lg-12 pl-lg-0">
                                <div className="card ideascard mt-3">
                                    <div className="card-header d-md-flex justify-content-between align-items-center">
                                        <h3>
                                            <span>
                                                {this.props.ideas.length} Best
                                                Ideas
                                            </span>
                                        </h3>
                                        <select
                                            className="custom-select ml-3"
                                            value={this.props.selectedSubEpic}
                                            onChange={(e) =>
                                                this.props.changeSelectedSubEpic(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {Object.keys(this.props.epics)
                                                .length > 0
                                                ? this.props.epics.EPic[0].SubEpic.map(
                                                      (subEpic) => {
                                                          return (
                                                              <option
                                                                  key={
                                                                      "subEpic_" +
                                                                      subEpic.id
                                                                  }
                                                                  value={
                                                                      subEpic.id
                                                                  }
                                                              >
                                                                  {subEpic.name}
                                                              </option>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </select>
                                    </div>
                                    <div className="card-body ideas-card">
                                        {ideaList}
                                        <div className="row w-100">
                                            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9 offset-md-4 offset-lg-4 offset-xl-3 text-center">
                                                <a
                                                    href="#"
                                                    className={
                                                        this.props
                                                            .ideasToPublish
                                                            .length > 0
                                                            ? "btn btn-proceed "
                                                            : "btn btn-proceed"
                                                    }
                                                    onClick={() =>
                                                        this.props.publishScores()
                                                    }
                                                >
                                                    Publish The Scores
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DTDVFBodyDetail;
