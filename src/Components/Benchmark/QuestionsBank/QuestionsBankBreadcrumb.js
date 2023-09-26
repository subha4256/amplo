import React from "react";
import { Link } from 'react-router-dom';

const QuestionsBankBreadcrumb = (props) => {
    return(
        <>
            {/* <!-- Breadcrumb --> */}
            {props.mode=='edit'?
             <ol className="breadcrumb dashbread">
             <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
             <li className="breadcrumb-item active">AmpMarking</li>
             <li className="breadcrumb-menu d-md-down-none ml-auto">
                 <span className="position-relative helpwrap">
                     <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                     <div className="dropdown-menu" aria-labelledby="helpBtn">
                         <p>Lorem Ipsum Dolor</p>
                     </div>
                 </span>
             </li>
             <li className="breadcrumb-menu d-md-down-none">
                <img src={ require('./../../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                 <a className="btn powered p-0" href="#">
                     <i className="icon-graph"></i> &nbsp;
                     <i>Powered by Amploglobal</i>
                 </a>
                 
             </li>
         </ol>:
            <ol className="breadcrumb dashbread">
                <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                <li className="breadcrumb-item active"><a href="#">Manage</a></li>
                <li className="breadcrumb-item active"><a href="#">AmpMarking</a></li>
                <li className="breadcrumb-item">Create & Manage Questions </li>
                <li className="breadcrumb-menu d-md-down-none ml-auto">
                    <span className="position-relative helpwrap">
                        <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                        <div className="dropdown-menu" aria-labelledby="helpBtn">
                            <p>Lorem Ipsum Dolor</p>
                        </div>
                    </span>
                </li>
                <li className="breadcrumb-menu d-md-down-none">
                    {<img src={require('./../../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />}
                    <a className="btn powered p-0" href="#">
                        <i className="icon-graph"></i> &nbsp;
                    <i>Powered by Amploglobal</i>
                    </a>
                </li>
            </ol>}
            {/* <!-- End Breadcrumb --> */}
        </>
    )
}

export default QuestionsBankBreadcrumb;