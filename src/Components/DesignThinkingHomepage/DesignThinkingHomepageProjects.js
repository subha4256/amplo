import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const DesignThinkingHomepageProjects = (props) => {
    
    let today = moment().format('YYYY-MM-DD');
    let projects = props.projects.map((project)=>{
        //Only show the Active project....
        
        if(project.Status === "Active") {
        let l_up = moment(project.UpdatedDate,"YYYY-MM-DD");
        let to = moment(today,"YYYY-MM-DD");
        console.log(to.diff(l_up, 'days'));
        return(
            <Link to={'/dt-epic-dashboard/'+project.DTProjectID}>
                <div class="col-sm-12 mb-2" key={project.DTProjectID}>
                    <div class="bg-projects">
                        <div class="pro-img">
                            <img src={ require('../../common/images/design-project.jpg') }  class="img-fluid" alt="" />
                        </div>
                        <h3 class="mt-4 text-left">{project.ProjectTitle}</h3>
                        <p>Updated {(to.diff(l_up, 'days') != null)?to.diff(l_up, 'days'):0} {(to.diff(l_up, 'days') != null && to.diff(l_up, 'days') == 1 ? "day" : "days")} ago</p>
                    </div>
                </div>
            </Link>
        )
    }
    });
    return(
        <div class="row mt-3 projects-row">
            {projects}
        </div>
    )
}

export default DesignThinkingHomepageProjects;