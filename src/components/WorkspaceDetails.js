import React from 'react';
import { UncontrolledCarousel, Progress } from 'reactstrap';

const WorkspaceDetails = (props) => {

    const selectedWorkspace = props.workspace.workImages
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="25">25%</Progress>
                    </div>
                </div>
            </div>

            <div className="container mt-2 mb-2">
                {/* <div className="row">
                    <h1 class="col-sm-12 col-12">{props.workspace.name}</h1>
                </div> */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="carousel slide">
                            <div class="carousel-inner">
                                <UncontrolledCarousel items={selectedWorkspace} />
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-12">
                            <h4 className="mt-1" style={{textAlign:'center'}}>Take a virtual tour <a href="">here</a> </h4>
                        </div>
                    </div>
               
            </div>
            <div className="jumbotron d-sm-block d-none">

            </div>
        </>

    )
}

export default WorkspaceDetails;