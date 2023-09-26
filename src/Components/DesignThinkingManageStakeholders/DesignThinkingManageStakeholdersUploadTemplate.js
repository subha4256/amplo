import React from 'react';

const DesignThinkingManageStakeholdersUploadTemplate = () => {
    return(
        <p className="heading-para">
            <span>You can upload excel with stakeholders information. To avoid errors 
                <a href="#" className="text-primary"> download template</a>. Click on the button to browse the file and upload
            </span>
            <span className="upload-btn-wrapper">
                <button className="btn btn-upload">Upload </button>
                <input type="file" name="upload" />
            </span>
        </p>
    );
}

export default DesignThinkingManageStakeholdersUploadTemplate;