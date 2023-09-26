import React from 'react';

const  BalancedScorecardGoalSetting = props => {
    let goalSetting = props.GoalSetting.map((goalset,key)=>{
        let color = "";
        let bgColor = "";
        let title = "";
        switch(goalset.title){
            case "Vision":
                color = "col-sm-12 col-md-2 bg-yellow align-items-center py-3";
                bgColor = "col-sm-12 col-md-10 align-items-center py-3";
            break;
            case "Purpose":
                color = "col-sm-12 col-md-2 bg-green align-items-center py-3";
                bgColor = "col-sm-12 col-md-10 align-items-center px-3 bg-gray";
            break;
            case "StrategicPriorities":
                color = "col-sm-12 col-md-2 bg-orange align-items-center py-3";
                bgColor = "col-sm-12 col-md-10 align-items-center px-3";
            break;
            case "StrategicResults":
                color = "col-sm-12 col-md-2 bg-lightblue align-items-center py-3";
                bgColor = "col-sm-12 col-md-10 align-items-center px-3 bg-gray";
            break;
        }
        switch(goalset.title){
            case "Vision":
                title = "Vision";
            break;
            case "Purpose":
                title = "Purpose";
            break;
            case "StrategicPriorities":
                title = "Strategic Priorities";
            break;
            case "StrategicResults":
                title = "Strategic Results";
            break;
        }
        let desc = "";
        if(Array.isArray(goalset.description)){
            let descNew = goalset.description.map((desc,key1)=>{
                return[
                    <span key={key1}  
                        className="flex-fill py-3" 
                        onDoubleClick={(e)=>props.arrayGoalSettingHandler(e)}
                    >
                        {desc.description}
                        {(props.report === "report")?"":<a 
                            onClick={(e)=>props.goalSettingDeleteRowHandler(goalset.title,key1)}
                        >
                            <i style={{pointerEvents:"none"}} 
                            className="fa fa-minus"></i>
                        </a>}
                    </span>,
                    <input 
                        key={"in"+key1} 
                        type="text" 
                        value={desc.description}
                        onChange={(e)=>props.arrayGoalSettingHandlerEdit(e,goalset.title,key1)}
                        onBlur={(e)=>props.arrayGoalSettingBlurHandler(e)} className="form-control hid" 
                    />
                ];
            })
        desc = <p className="d-flex justify-content-between text-center align-items-center">{descNew}{(props.report === "report")?"":<a id="strategicPriorities" onClick={()=>props.addGoalSettingRow(goalset.title)}><i style={{ pointerEvents : "none" }} className="fa fa-plus" aria-hidden="true"></i></a>}</p>;
        }else{
            desc = [
                <p 
                    key={key}
                    onDoubleClick={(e)=>props.editDoubleClickHandler(e)}
                >
                    {goalset.description}
                </p>,
                <input 
                    key={"in"+key}
                    className="form-control hid" 
                    value={goalset.description}
                    onChange={(e)=>props.goalSettingChangeHandler(e,goalset.title)}  onBlur={(e)=>props.GoalSettingBlurHandler(e)} 
                />
            ];
        }

        return(
            <div className="row border-top" key={key}>
                <div className={color}>
                    <h2>{title}</h2>
                </div>
                <div className={bgColor}>
                {desc}
                </div>
            </div>
        )
    })
    return(
        <>
            <div className="bg-white balanced-details-row mt-3 mb-0">
                <div className="balanced-col-wraper">
                    <div className="row mb-2">
                        <div className="col-sm-12 pl-0">
                            <h1 className="head-title">Goal Setting</h1>
                        </div>
                    </div>
                    {goalSetting}
                </div>
            </div>
        </>
    )
}

export default BalancedScorecardGoalSetting;