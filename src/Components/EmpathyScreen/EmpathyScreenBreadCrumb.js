import React from 'react';
import {Link} from 'react-router-dom';
const EmpathyScreenBreadCrumb = props => {

    const { epicDetail } = props; 
    console.log(epicDetail);

    return(
        <>
            {/* <!-- Breadcrumb --> */}
            <ol className="breadcrumb dashbread mb-0">
            <li className="breadcrumb-item active"><Link to="/dt-dashboard">Home</Link></li>
            <li className="breadcrumb-item">Design Led Materiality</li>
            <li className="breadcrumb-item">Project</li>
            <li className="ml-auto">
                <Link className="" to={`/dt-epicdetail/${props.dtId}/${props.epicId}`}><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</Link>
            </li>
            </ol>
            {/* <!-- End Breadcrumb --> */}
        </>
    );
}
export default EmpathyScreenBreadCrumb;