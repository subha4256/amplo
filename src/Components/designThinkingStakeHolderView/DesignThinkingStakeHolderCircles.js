import React from 'react';

const DesignThinkingStakeHolderCircles = (props) =>{

       // console.log("Props ==>", props)
    return(
        <div id="Noi-image" style={{display:"inline-block"}}>
        <div className="network-first-circle" id="canvas" onDrop={(e)=>{props.stakeHolderDropHandler(e)}} onDragOver={(e)=>props.stakeholderDragOverHandler(e)}>
            <div className="circle-text" style={{pointerEvents:"none"}}>C</div>
            {/*<!-- Start Circle-2 -->*/}
            <div className="network-second-circle" style={{pointerEvents:"none"}}>
                <div className="circle-text">B</div>
                {/*<!-- Start Circle-3 -->*/}
                <div className="network-third-circle" style={{pointerEvents:"none"}}>
                    <div className="circle-text">A</div>
                </div>
                {/*<!-- End Circle-3 -->*/}
            </div>
            {/*<!-- End Circle-2 -->*/}
        </div>
        </div>
    );
}

export default DesignThinkingStakeHolderCircles;
