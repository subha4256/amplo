import React from 'react';
import {Link} from 'react-router-dom'
const CJMScreenBreadcrumb = props => {

    return(
        <>
            {/* <!-- Breadcrumb --> */}
            <ol className="breadcrumb dashbread mb-0">
                <li className="breadcrumb-item active"><Link to="/dt-dashboard">Home</Link></li>
                <li className="breadcrumb-item">Design Led Materiality</li>
                <li className="breadcrumb-item">Epic 1</li>
                {/* <li className="breadcrumb-menu d-md-down-none ml-auto">
                <img src="imgs/diva-icon.png" className="logo-img" alt="Logo"/>
                <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                </li> */}
            </ol>

            {/* <!-- End Breadcrumb --> */}
        </>
    );
}
export default CJMScreenBreadcrumb;