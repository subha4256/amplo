import React from 'react';

const balancedScorecardBreadcrumb = () =>{
    return(
        <>
            {/* <!-- Breadcrumb --> */}
            <ol className="breadcrumb dashbread mb-0">
            <li className="breadcrumb-item active"><a href="#">Home</a></li>
            <li className="breadcrumb-item">Manage</li>
            <li className="breadcrumb-item">Global Business Initiative</li>
            <li className="breadcrumb-menu d-md-down-none ml-auto">
                <img src={ require('../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
            </li>
            </ol>
            {/* <!-- End Breadcrumb --> */}
        </>
    )
}

export default balancedScorecardBreadcrumb;