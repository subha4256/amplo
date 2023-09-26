import React from 'react';

const DesignThinkingStakeHolderViewBreadCrumb = () =>{
    return(
        <ol className="breadcrumb dashbread mb-0">
            <li className="breadcrumb-item active"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item">Design Led Materiality</li>
            <li className="breadcrumb-item">Network of Influences</li>
            <li className="breadcrumb-menu d-md-down-none ml-auto">
                <span className="position-relative helpwrap">
                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                        <p>Lorem Ipsum Dolor</p>
                    </div>
                </span>
            </li>
            <li className="breadcrumb-menu d-md-down-none">
                <img src={ require('../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
            </li>
        </ol>
    );
}

export default DesignThinkingStakeHolderViewBreadCrumb;