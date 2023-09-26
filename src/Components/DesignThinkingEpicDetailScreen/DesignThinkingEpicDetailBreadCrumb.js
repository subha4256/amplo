import React from 'react';
import {Link} from 'react-router-dom';
 
const DesignThinkingEpicDetailBreadCrumb = props => {

    const { epicDetail } = props; 

    return(
        <>
            {/* <!-- Breadcrumb --> */}
            <ol className="breadcrumb dashbread mb-0">
            <li className="breadcrumb-item active"><Link to="/dt-dashboard">Home</Link></li>
            <li className="breadcrumb-item">Design Led Materiality</li>
            <li className="breadcrumb-item">{epicDetail.Title}</li>
            <li className="ml-auto">
                <Link className="" to={`/dt-epic-dashboard/${props.dtId}`}><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</Link>
            </li>
            </ol>
            {/* <!-- End Breadcrumb --> */}
        </>
    );
}
export default DesignThinkingEpicDetailBreadCrumb;