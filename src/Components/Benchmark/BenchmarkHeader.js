import React from 'react';
import SVGIcon from '../SVGicon';
import {Link} from 'react-router-dom';

const BenchmarkHeader = (props) => {
    return (
        <div className="header-row">
            <div className="header-sec">
                <div className="icon-sec">
                    <div className="d-flex">
                        <div className="iconWrap processAccessmentWrap">
                            <SVGIcon name="ProcessAccessment" width="13px" height="13px" fill="#fff"></SVGIcon>
                        </div>
                        <div className="iconWrap businessModellingWrap">
                            <SVGIcon name="BusinessModelling" width="13px" height="13px" fill="#fff"></SVGIcon>
                        </div>
                        <div className="iconWrap designThinkingWrap">
                            <SVGIcon name="DesignThinking" width="13px" height="13px" fill="#fff"></SVGIcon>
                        </div>
                        <div className="iconWrap kpiWrap">
                            <SVGIcon name="kpi" width="13px" height="13px" fill="#fff"></SVGIcon>
                        </div>
                        <div className="iconWrap roadmapWrap">
                            <SVGIcon name="roadmap" width="13px" height="12px" fill="#fff"></SVGIcon>
                        </div>
                    </div>
                    <p>CAPABILITY MODELING</p>
                </div>
                <div className="report-btn ml-auto" ><i style={{pointerEvents:'none'}} className="fas fa-cloud-download-alt mr-2"></i> <a href="#" onClick={props.onDownload}>Download
                    Report</a></div>
                <div className="toggle-btn ml-4">
                    <button type="button" className="btn btn-lock">Lock</button>
                    <button type="button" className="btn btn-unlock"><i className="fas fa-check"></i> Unlock</button>
                </div>
                <div className="back-btn ml-4">
                    <Link to="/reports"><button type="button" className="btn btn-primary">Back</button></Link>
                </div>
            </div>
        </div>
    )
}

export default BenchmarkHeader;