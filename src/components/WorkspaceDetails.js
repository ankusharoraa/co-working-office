import React from 'react';
import { UncontrolledCarousel, Progress, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                        <p id = "tour" className="lead mt-1" style={{ textAlign: 'center' }}>Take a virtual tour <a href="#tour">here</a> </p>
                    </div>
                </div>

            </div>
            <div className="jumbotron">
                <div className="container">

                    <Card body>
                        <div className="row">
                            <div className="col-sm-5 col-12">
                                <h4>Office details:</h4>
                                <div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item list-group-item-action">{props.workspace.details.capacity}
                                        </li>
                                        <li className="list-group-item list-group-item-action">{props.workspace.details.available}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="offset-sm-1 col-sm-6 col-12">
                                <h4>Nearby Facilities:</h4>
                                <div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item list-group-item-action">{props.workspace.facilities.office}
                                        </li>
                                        <li className="list-group-item list-group-item-action">{props.workspace.facilities.station}
                                        </li>
                                        <li className="list-group-item list-group-item-action">{props.workspace.facilities.access}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <p style={{ textAlign: 'center', fontSize: '25px' }} className="lead mt-2">Package handling and printing facilities</p>
                                <p style={{ textAlign: 'center' }}><mark><em>Compilant with <strong>COVID</strong> safety norms</em></mark></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-12">
                                <p id = "special"><em>Contact us <a href='#special'>here</a> to enquire about special facilities</em></p>
                                <Link style = {{textDecoration : "none"}} to = "/personalinfo"><button className="btn btn-block btn-primary mt-2">Lease This Workspace</button></Link>
                            </div>
                        </div>
                    </Card>


                </div>
            </div>

        </>

    )
}

export default WorkspaceDetails;