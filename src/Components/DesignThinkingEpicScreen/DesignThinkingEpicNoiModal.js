import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DesignThinkingEpicScreenWrapper } from "./Styling/DesignThinkingEpicScreen";

const DesignThinkingEpicNoiModal = (props) => {
    const [selectedImage, setSelectedImage] = useState({
        name: "",
        imageURl: "",
        orginalNOiId: "",
        showSelectedNoi:true
    });

    const selectTemplate = (e, props, id) => {
        props.selectTemplate(e, id);
        console.log(id, e);
        setSelectedImage({
            ...selectedImage,
            imageURl: id?.NOIImageURL,
            name: id?.Title,
            showSelectedNoi:false
        });
    };

    useEffect(() => {

         
            let arr = props.allEpic.find((epic) => {
                if (epic.id === props.selectedEpic) {
                    return epic;
                }
            });
    
            let name = arr?.NOI?.TemplateNoiName;
    
            console.log(arr);
    
            setSelectedImage({
                ...selectedImage,
             imageURl:arr?.NOI?.NOIImageURL,
                name: arr?.NOI?.TemplateNoiName,
                orginalNOiId: arr?.NOI?.OriginalTemplateID ,
                showSelectedNoi:true
            });
       
           

           
    }, [props.selectedEpic]);

    // console.log(arr?.NOI?.TemplateNoiName)

    // console.log("NOI Props=>>>>. ", props);
    // console.log("NOI State=>>>>. ", selectedImage);

    let networkList = props.NetworkOfInfluence.map((item, index) => {
        return (
            <div
                key={index}
                className={
                    props.currentSelectedTemplate.Id == item.Id ||
                   selectedImage.showSelectedNoi && selectedImage.orginalNOiId == item.Id
                        ? "network-search-list active"
                        : "network-search-list"
                }
                onClick={(e) => selectTemplate(e, props, item)}
            >
                <h3>{item.Title}</h3>
             
            </div>
        );
    });
    return (
        <DesignThinkingEpicScreenWrapper>
            <div className="modal noiModal" id="noiModal">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Select Network of Influence
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                
                            >
                                <span aria-hidden="true">
                                    <img
                                    className="mt-2"
                                        src={require("../../common/images/close-icon.png")}
                                        alt=""
                                    />
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-4 pr-0">
                                    <div className="search-box">
                                        <div className="search-area">
                                            <h2>
                                                NOIs{" "}
                                                <Link
                                                    className="float-right"
                                                    to={"/dt-stakeholdersview"}
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-plus float-right"></i>
                                                </Link>
                                            </h2>
                                            <div className="form-group has-search m-0">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={props.NOISearchTerm}
                                                    onChange={(e) =>
                                                        props.setNOISearchTerm(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span className="fa fa-search form-control-feedback"></span>
                                            </div>
                                        </div>
                                        {networkList}
                                    </div>
                                </div>
                                <div className="col-sm-8 bg-gray pl-0 text-center">
                                    <h4 className="text-left p-3">
                                        {selectedImage?.name || "Select Noi"}
                                    </h4>
                                    <img
                                        className="img-fluid"
                                        src={
                                            selectedImage.imageURl
                                                ? selectedImage?.imageURl
                                                : require("../../common/images/circle.png")
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link
                                className="btn btn-link mr-auto"
                                to={"/dt-stakeholdersview"}
                                target="_blank"
                            >
                                Create New
                            </Link>
                            <button
                                type="button"
                                className="btn btn-link"
                                data-dismiss="modal"
                                onClick={() =>
                                    props.cancelTemplatePopUpHandler()
                                }
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                disabled={
                                    Object.keys(props.currentSelectedTemplate)
                                        .length > 0
                                        ? false
                                        : true
                                }
                                onClick={() => props.saveSelectedtemplate()}
                            >
                                SELECT TEMPLATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DesignThinkingEpicScreenWrapper>
    );
};

export default DesignThinkingEpicNoiModal;
