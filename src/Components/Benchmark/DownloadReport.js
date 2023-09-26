import React, { Component } from 'react';

class DownloadReport extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
            <div class="bg-white1 report-Detailed-sec mb-5">
                <div class="top-heading">
                  <h2 class="heading">Detailed Reports</h2>
                  <div class="report-btn ml-auto"><i class="fas fa-cloud-download-alt mr-2"></i> <a href="#">Download
                      PDF</a></div>
                  <a href="#" class="add-btn"><i class="fas fa-plus"></i></a>
                </div>
              </div>
              <div class="my-5 text-center request-btn">
                <button type="button" class="btn btn-primary">REQUEST AMPLO DEMO</button>
              </div>
              </>
        )
    }
}
export default DownloadReport;