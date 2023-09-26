import React from 'react';

const EmpathyScreenBodyDetail = props => {
    return(
        <>
            {/* <!-- Start Body Content --> */}
            <div class="dt-content-wrapper">
                                <div class="content-wraper">
                                    <div class="container-fluid">
                                        <div class="row pt-3 interviews-tabs">
                                            <div class="col-sm-12 col-md-12 col-lg-4 pl-0 pt-2">
                                                <h1>Empathize</h1>
                                            </div>
                                            <div class="col-sm-12 col-md-12 col-lg-8 p-0">
                                                <ul class="nav nav-pills" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="dt-interviews.html">Interviews</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#">Empathy Map</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link active" href="#">Process Details</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#">Personas</a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                        <div class="row mb-5">
                                            <div class="tab-content dt-tab-content w-100">
                                                <div class="tab-pane fade show active" id="process">
                                                    <div class="row">

                                                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 process-user-info-sec pb-4">
                                                            <div class="interview-heading d-md-flex justify-content-between py-3 px-3">
                                                                <h2>
                                                                    Process Details
                                                                    <span class="ml-3">
                                                                        <a href="dt-processdetail.html" class=""><i class="fas fa-bars"></i></a>
                                                                        <a href="dt-processdetail-treeview.html" class="ml-2 active"><i class="fas fa-sitemap"></i></a>
                                                                    </span>
                                                                </h2>
                                                                <div>
                                                                    <a href="#"><i class="fas fa-cloud-download-alt"></i> Download</a>
                                                                    <a href="#" class="ml-3"><i class="fas fa-plus"></i></a>
                                                                </div>
                                                            </div>
                                                            <div class="interview-heading border-0 d-md-flex justify-content-between px-3">
                                                                <h2 class="mt-3 map-title">Stage Details 1</h2>
                                                                <div class="pt-3">
                                                                    <a href="#">Duplicate</a> |
                                                                    <a href="#" class="mx-1">Delete</a> |
                                                                    <a href="#" class="ml-1">Save as New Version</a>
                                                                </div>
                                                            </div>
                                                            <div class="process-tree-view mt-5">
                                                                <div class="table-responsive">
                                                                    <div class="tree-process-btn text-center"><a href="#" class="btn btn-process">Process</a></div>
                                                                    <div class="tree-process-subbtn d-flex justify-content-between">
                                                                        <div class="stage-block"><a href="#" class="btn btn-process">Stage 1</a>
                                                                            <ul class="tree-list">
                                                                                <li>
                                                                                    <span class="treecircle">1.1</span> <span class="circletxt">Sub Stage 1</span>
                                                                                    <ul class="subtree-list">
                                                                                        <li><span class="treesquare">1.1.1</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                        <li><span class="treesquare">1.1.2</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                    </ul>
                                                                                </li>
                                                                                <li><span class="treecircle">1.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                <li><span class="treecircle">1.3</span> <span class="circletxt">Sub Stage 3</span></li>
                                                                                <li><span class="treecircle circle-gray">1.4</span></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="stage-block">
                                                                            <a href="#" class="btn btn-process">Stage 2</a>
                                                                            <ul class="tree-list">
                                                                                <li>
                                                                                    <span class="treecircle">2.1</span> <span class="circletxt">Sub Stage 1</span>
                                                                                </li>
                                                                                <li><span class="treecircle">2.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                <li><span class="treecircle">2.3</span> <span class="circletxt">Sub Stage 3</span></li>
                                                                                <li><span class="treecircle circle-gray">2.4</span></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="stage-block">
                                                                            <a href="#" class="btn btn-process">Stage 3</a>
                                                                            <ul class="tree-list">
                                                                                <li>
                                                                                    <span class="treecircle">1.1</span> <span class="circletxt">Sub Stage 1</span>
                                                                                    <ul class="subtree-list">
                                                                                        <li><span class="treesquare">1.1.1</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                        <li><span class="treesquare">1.1.2</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                    </ul>
                                                                                </li>
                                                                                <li><span class="treecircle">1.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                <li><span class="treecircle">1.3</span> <span class="circletxt">Sub Stage 3</span></li>
                                                                                <li><span class="treecircle circle-gray">1.4</span></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="stage-block"><a href="#" class="btn btn-process">Stage 4</a>
                                                                            <ul class="tree-list">
                                                                                <li>
                                                                                    <span class="treecircle">2.1</span> <span class="circletxt">Sub Stage 1</span>
                                                                                </li>
                                                                                <li><span class="treecircle">2.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                <li><span class="treecircle">2.3</span> <span class="circletxt">Sub Stage 3</span></li>
                                                                                <li><span class="treecircle circle-gray">2.4</span></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="stage-block"><a href="#" class="btn btn-process">Stage 5</a>
                                                                            <ul class="tree-list">
                                                                                <li>
                                                                                    <span class="treecircle">1.1</span> <span class="circletxt">Sub Stage 1</span>
                                                                                    <ul class="subtree-list">
                                                                                        <li><span class="treesquare">1.1.1</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                        <li><span class="treesquare">1.1.2</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                    </ul>
                                                                                </li>
                                                                                <li><span class="treecircle">1.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                <li><span class="treecircle">1.3</span> <span class="circletxt">Sub Stage 3</span></li>
                                                                                <li><span class="treecircle circle-gray">1.4</span></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="stage-block"><a href="#" class="btn btn-process">Stage 6</a>
                                                                            <ul class="tree-list">
                                                                                <li>
                                                                                    <span class="treecircle">2.1</span> <span class="circletxt">Sub Stage 1</span>
                                                                                </li>
                                                                                <li><span class="treecircle">2.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                <li><span class="treecircle">2.3</span> <span class="circletxt">Sub Stage 3</span></li>
                                                                                <li><span class="treecircle circle-gray">2.4</span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>

                                                                    <div class="process-key-sec mt-5 px-5 mb-5">
                                                                        <h3>Process Key</h3>
                                                                        <div class="process-key-wraper pt-3 pl-4">
                                                                            <ul class="list-inline">
                                                                                <li class="list-inline-item"><a href="#" class="btn btn-process">Stages</a>
                                                                                    <span class="dot"></span>
                                                                                </li>
                                                                                <li class="list-inline-item">
                                                                                    <ul class="tree-list">
                                                                                        <li><span class="treecircle">1.2</span> <span class="circletxt">Sub Stage 2</span></li>
                                                                                    </ul>
                                                                                    <span class="dot"></span>
                                                                                </li>
                                                                                <li class="list-inline-item">
                                                                                    <ul class="subtree-list">
                                                                                        <li><span class="treesquare">1.1.1</span> <span class="squaretxt">Level 3 activity</span></li>
                                                                                    </ul>
                                                                                    <span class="dot"></span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
              {/* <!-- End Body Content --> */}
        </>
    );
} 

export default EmpathyScreenBodyDetail;