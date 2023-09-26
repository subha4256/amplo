import React,{Component} from 'react';
import { connect } from 'react-redux';
import DashboardHeader from '../../includes/dashboardHeader/DashboardHeader';
import { SupportAmpWrapper } from '../styling/SupportAmp';
import AmpHeader from './AmpHeader';
import { getSupportPageDetails } from '../../../actions/supportAction';
import image10 from '../../../common/images/image10.png';
import image20 from '../../../common/images/image20.png';
import image23 from '../../../common/images/image23.png';
import image11 from '../../../common/images/image11.png';
import image4 from '../../../common/images/image4.png';
import image14 from '../../../common/images/image14.png';
import image13 from '../../../common/images/image13.png';
import image15 from '../../../common/images/image15.png';
import image19 from '../../../common/images/image19.png';
import image22 from '../../../common/images/image22.png';
import image3 from '../../../common/images/image3.png';
import image1 from '../../../common/images/image1.png';
import image7 from '../../../common/images/image7.png';
import image6 from '../../../common/images/image6.png';
import image5 from '../../../common/images/image5.png';
import image17 from '../../../common/images/image17.png';
import image8 from '../../../common/images/image8.png';
import image12 from '../../../common/images/image12.png';
import image9 from '../../../common/images/image9.png';
import image21 from '../../../common/images/image21.png';
import image18 from '../../../common/images/image18.png';
import FooterComponent from '../../includes/dashboardFooter/FooterComponent';

class SupportAmp extends Component{
    constructor(props){
        super(props);
        this.state = {
            subCatId : this.props.match.params.subCatId,
            catId : this.props.match.params.catId
        }
    }

    componentDidMount = () => {
        this.props.getSupportPageDetails(this.state.catId,this.state.subCatId);
    }

    render(){
        return(
            <>
            <DashboardHeader/>

            <SupportAmpWrapper id="wrapper">
<div id="content-wrapper" className="d-flex flex-column">

           
            <div id="content">
                <AmpHeader/>
                <div className="container-fluid container-support">

                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-3 pr-md-5 faqLeft">
                        <h2>FAQs for AmpMarking</h2>
                            <ul className="nav nav-pills flex-column">
                                <div className="sidebar-heading">
                                    SETUP
                                </div>
                                { !Array.isArray(this.props.SupportQuestions) && Object.keys(this.props.SupportQuestions).length > 0 && this.props.SupportQuestions.hasOwnProperty('Questions') ?
                                    this.props.SupportQuestions.Questions.map((question,ind)=>{
                                        return(
                                            <li className="nav-item" key={"question_left_"+question.QuestionId}>
                                                <a className={ind == 0 ? "nav-link active" : "nav-link"} data-toggle="pill" href={"#question_left_"+question.QuestionId}>{question.Question}</a>
                                            </li>
                                        )
                                    })
                                : null}

                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-9 p-right">
                            <div className="tab-content">
                                { !Array.isArray(this.props.SupportQuestions) && Object.keys(this.props.SupportQuestions).length > 0 && this.props.SupportQuestions.hasOwnProperty('Questions') ?
                                    this.props.SupportQuestions.Questions.map((question,ind)=>{
                                        return(
                                            <div className={ind == 0 ? "tab-pane active" : "tab-pane"} key={"question_left_body_"+question.QuestionId} id={"question_left_"+question.QuestionId}>
                                                <button type="button" className="btn btn-support">AmpMarking</button>
                                                <h2 className="title">
                                                    {question.Question}
                                                </h2>
                                                {question.Answers.length > 0 ? 
                                                    question.Answers.map(ans=>{
                                                        return(
                                                            <div key={"answer_body_text_"+ans.AnswerId}>
                                                                <p>
                                                                    {ans.Answer}
                                                                </p>
                                                                {ans.Files.length > 0 ? 
                                                                    ans.Files.map(file=>{
                                                                        return(
                                                                            <div className="ampsupport" key={`answer_file_${file.FileName}`}>
                                                                                {file.ShowImage == "1" ? <img src={file.ImagePath} alt="AmpMarking"/> : ""}
                                                                            </div>
                                                                        )
                                                                    })
                                                                : null}
                                                            </div>
                                                        )
                                                    })
                                                : null }
                                                {/* <p>
                                                    2. Click “AmpMarking Manage” menu item on the left.
                                                    <ol className="lower">
                                                        <li>Click “Create/Manage Projects.</li>
                                                        <div className="ampsupport">
                                                            <img src={image23} alt="Create/Manage"/>
                                                        </div>
                                                        <li>Start with creating a project name and selecting enterprise users to add to your AmpMarking project. </li>
                                                        <li>Save the project.</li>
                                                        <div className="ampsupport">
                                                            <img src={image10} alt="Save the project"/>
                                                        </div>
                                                    </ol>
                                                </p> */}
                                            </div>
                                        )
                                    })
                                : null}
                                {/* <div className="tab-pane" id="tab1a">
                                    <button type="button" className="btn btn-support">AmpMarking</button>
                                    <h2 className="title">
                                        How do I add questions and access suggested questions from AmpLibrary?
                                    </h2>
                                    <ol classNameName="number">
                                    <li>How do I create a question bank? 
                                        <ol className="lower">
                                            <li>Click on Actions </li>
                                            <li>Select “"Add/Edit Questions Bank" </li>
                                            <div className="ampsupport">
                                                <img src={image4} alt="Add/Edit Questions Bank" />
                                            </div>
                                            <li>Enter Questions Bank Name under "Enter Questions Bank Name" </li>
                                            <div className="ampsupport">
                                                <img src={image11} alt="Enter Questions Bank Name" />
                                            </div>
                                            <li>Click Save</li>
                                        </ol>
                                        </li>
                                        <li>How to Delete a Questions bank?
                                            <ol className="lower">
                                                <li>Click on "Actions"</li>
                                                <li>Select "Add/Edit Questions Bank"</li>
                                                <li>Under "Select from Existing Questions Bank", click the "three bars"</li>
                                                <li>Click the "x" next to the Question Bank you want to remove.</li>
                                                <div className="ampsupport">
                                                    <img src={image14} alt="Question Bank"/>
                                                </div>
                                                <li>When asked the question" Confirm to continue. Are you sure to delete this Question Bank?", click Yes.</li>
                                                <div className="ampsupport">
                                                    <img src={image15}alt="Confirm to continue"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Duplicate a Questions Bank?
                                            <ol className="lower">
                                                <li>Under Question Banks, select desired Question Bank to duplicate.</li>
                                                <li>Click on "Actions"</li>
                                                <li>Select "Duplicate Questions Bank"</li>
                                                <li>Enter New Questions Bank Name</li>
                                                <li>When asked the question" Confirm to continue. Are you sure to delete this Question Bank?", click Yes.</li>
                                                <li>Click Save</li>
                                                <div className="ampsupport">
                                                    <img src={image13} alt="Click Save"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Assign Industry classNameification to a Questions bank?
                                            <ol className="lower">
                                                <li>Under Question Banks, select desired Question Bank.</li>
                                                <li>Click on "Actions"</li>
                                                <li>Select "Assign Industry classification"</li>
                                                <li>Select Industry Vertical</li>
                                                <li>Select Sub-Industry Vertical or N/A</li>
                                                <div className="ampsupport">
                                                    <img src={image19} alt="Sub-Industry"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Review a Question Bank Using Question Bank right menu ?
                                            <ol class="lower">
                                                <li>Review a Question Bank Using Question Bank right menu. </li>
                                                <li>Click the + next to the listed Question Bank </li>
                                                <li>Click the + next to the listed Question Bank </li>
                                                <li>Click the + next to the Question Domain </li>
                                                <li>Questions are listed. </li>
                                                <li>Responses are not shown </li>
                                                <div className="ampsupport">
                                                    <img src={image22} alt="Sub-Industry"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Review a Question Bank with Numeric Responses?
                                            <ol className="lower">
                                                <li>Under Question Banks, select desired Question Bank. The questions contained in the bank by Question Domain will appear.</li>
                                                <li>Click the Question Domain and the questions and numeric responses, associated with that domain, will appear below.</li>
                                                <li>If you make changes, click “Save” at the top right of the screen.</li>
                                                <div className="ampsupport mb-3">
                                                    <img src={image3} alt="Support"/>
                                                </div>
                                                <div className="ampsupport">
                                                    <img src={image1} alt="Support"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Add a Question Domain to a Question Bank?
                                            <ol className="lower">
                                                <li>Under Question Banks, select the desired Question Bank.</li>
                                                <li>In the AmpMarking box, click the "three dots" </li>
                                                <li>Click "Add/Edit Domains" </li>
                                                <li>Under "Enter Domain Name", enter new Question Domain name. </li>
                                                <li>Click "Save" </li>
                                                <div className="ampsupport mb-3">
                                                    <img src={image7} alt="Enter Domain Name"/>
                                                </div>
                                                <div className="ampsupport mb-3">
                                                    <img src={image6} alt="Enter Domain Name"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Delete a Question Domain from a Question Bank?
                                            <ol className="lower">
                                                <li>Under Question Banks, select the desired Question Bank. </li>
                                                <li>In the AmpMarking box, click the "three dots" </li>
                                                <li>Click "Add/Edit Domains" </li>
                                                <li>Under "Select from Existing Domains", click the "three bars" </li>
                                                <div className="ampsupport mb-3">
                                                    <img src={image7} alt="Existing Domains"/>
                                                </div>
                                                <li>Click the "x" next to the Question Domain you want to remove. </li>
                                                <li>When asked the question" Confirm to continue. Are you sure to delete this Domain?", click Yes. </li>
                                                <div className="ampsupport">
                                                    <img src={image5} alt="delete Domain"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Edit a Question Domain name?
                                            <ol className="lower">
                                                <li>Under Question Banks, select the desired Question Bank. </li>
                                                <li>In the AmpMarking box, click the "three dots" </li>
                                                <li>Click "Add/Edit Domains"</li>
                                                <li>Under "Select from Existing Domains", click the "three bars"</li>
                                                <div className="ampsupport">
                                                    <img src={image7} alt="Existing Domains"/>
                                                </div>
                                                <li>Click the "o" next to the Question Domain you want to edit.</li>
                                                <li>Make the necessary change to the domain name in the "Enter Domain Name" box.</li>
                                                <li>Click "Save"</li>
                                                <div className="ampsupport">
                                                    <img src={image17} alt="Domain Name"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Edit a "Style" for Questions for a particular Question Domain?
                                            <ol className="lower">
                                                <li>Under Question Banks, select desired Question Bank. The questions contained in the bank by Question Domain will appear. </li>
                                                <li>Click the Question Domain under the heading the heading "AmpMarking" and the questions and numeric responses, associated with that domain, will appear below. </li>
                                                <div className="ampsupport">
                                                    <img src={image3} alt="Style Domain"/>
                                                </div>
                                                <li>Under the "Question Domain" heading, click the "three dots." </li>
                                                <li>Select "Pick a Style" </li>
                                                <li>In the dialogue box, you can select a style (Culture, Knowledge, Processes, Strategy, Technology) </li>
                                                <div className="ampsupport">
                                                    <img src={image8} alt="dialogue box"/>
                                                </div>
                                                <li>If desired, you can upload "Response Images" that you would like to appear with your question by using file upload or drag&drop. </li>
                                                <li>Click Save. </li>
                                                <li>Repeat for each question in each Question Domain you wish to change. </li>
                                                <div className="ampsupport">
                                                    <img src={image12} alt="Question Domain"/>
                                                </div>
                                            </ol>
                                        </li>
                                        <li>How to Change the Order of Questions for a particular Question Domain?
                                            <ol className="lower">
                                                <li>Under Question Banks, select desired Question Bank. The questions contained in the bank will appear by Question Domain.</li>
                                                <li>Click the Question Domain under the heading the heading "AmpMarking" and the questions and numeric responses, associated with that domain, will appear below.</li>
                                                <li>Under the "Question Domain" heading and the particular question, click the "three dots."</li>
                                                <div className="ampsupport">
                                                    <img src={image3} alt="Question Domain"/>
                                                </div>
                                            </ol>
                                        </li>
                                    </ol>
</div>
<div className="tab-pane" id="tab2">
                                    <button type="button" className="btn btn-support">AmpMarking</button>
                                    <h2 className="title">
                                        How do I enable access to other registered users to join my project?
                                    </h2>
                                    <ol className="number">
                                        <li>Click “AmpMarking Manage” to select “Manage Access” option. </li>
                                        <div className="ampsupport">
                                            <img src={image9} alt="AmpMarking Manage"/>
                                        </div>
                                    </ol>
                                </div>
                                <div className="tab-pane" id="tab3">
                                    <button type="button" className="btn btn-support">AmpMarking</button>
                                    <h2 className="title">
                                        How do I assign domain parameters to my project?
                                    </h2>
                                    <ol className="number">
                                        <li>Create your own AmpMarking domain parameters. </li>
                                        <li>Click on appropriate domain to identify and/or create questions relevant to your project. </li>
                                    </ol>
                                </div>
                                <div className="tab-pane" id="tab4">
                                    <button type="button" className="btn btn-support">AmpMarking</button>
                                    <h2 className="title">
                                        How and when are goals established?
                                    </h2>
                                    <ol className="number">
                                        <li>Goals are established after all Ampmarking inquiries have been satisfied. </li>
                                    </ol>
                                </div>
                                <div className="tab-pane" id="tab7">
                                    <button type="button" className="btn btn-support">AmpMarking</button>
                                    <h2 className="title">
                                        How do I get access to a report?
                                    </h2>
                                    <ol className="number">
                                        <li> After all Ampmarking inquiries have been completed, click on “View Results”</li>
                                        <div className="ampsupport">
                                            <img src={image21} alt="View Results"/>
                                        </div>
                                    </ol>
                                </div>
                                <div className="tab-pane" id="tab8">
                                    <button type="button" className="btn btn-support">AmpMarking</button>
                                    <h2 className="title">
                                        Where are reports stored?
                                    </h2>
                                    <ol className="number">
                                        <li> Access Reports section on the top of the screen to access your project specific report or “View reports” after finishing Ampmarking inquiries in your project.</li>
                                        <div className="ampsupport mt-4">
                                            <img src={image18} alt="View reports"/>
                                        </div>
                                    </ol>
                                </div> */}
                                </div>
                                
                               
                                
                              
                                </div>
                        </div>
                        </div>
                </div>
                </div>
            </SupportAmpWrapper>
            <FooterComponent/>
            </>
        )
    }
}
const mapStateToProps = state => ({
    SupportQuestions: state.supportItems.SupportQuestions,
});
export default connect(mapStateToProps, { getSupportPageDetails })(SupportAmp);