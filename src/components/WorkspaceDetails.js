import React, { useState } from 'react';
import { UncontrolledCarousel, Progress, Card, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Link } from 'react-router-dom';


const WorkspaceDetails = (props) => {
    const [popState, setPopState] = useState(false);
    let togglePopUp = () => setPopState(!popState);



    const selectedWorkspace = props.workspace.workImages
    let details = props.workspace.details
    let fac = props.workspace.facilities
    console.log("Details ---> " + details)
    let showDetails = []
    let showFac = []
    for (let i = 0; i < details.length; i++) {
        showDetails.push(

            <>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">{details[i]}
                    </li>
                </ul>
            </>

        )
    }
    for (let i = 0; i < fac.length; i++) {
        showFac.push(
            <>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">{fac[i]}
                    </li>
                </ul>
            </>

        )
    }
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
                        <p id="tour" className="lead mt-1" style={{ textAlign: 'center' }}>Take a virtual tour <a href="#tour">here</a> </p>
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

                                    {showDetails}

                                </div>

                            </div>

                            <div className="offset-sm-1 col-sm-6 col-12">
                                <h4>Nearby Facilities:</h4>
                                <div>

                                    {showFac}

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">

                                <p style={{ textAlign: 'center' }}><mark><em>Compliant with <strong>COVID</strong> safety norms</em></mark></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-12">
                                <p id="special"><em>Contact us <a href='#contactJohnDoe' id='contactJohn' onClick={togglePopUp}>here</a> to enquire about special facilities</em></p>
                                <Link style={{ textDecoration: "none" }} to="/personalinfo"><button onClick={props.getSelectedWorkspaceId} className="btn btn-block btn-primary mt-2">Lease This Workspace</button></Link>
                            </div>
                        </div>
                    </Card>

                    <Popover placement="top-start" isOpen={popState} toggle={togglePopUp} target="contactJohn">
                        <PopoverHeader className = "bg-dark text-white">John Doe</PopoverHeader>
                        <PopoverBody className = "bg-light"><a href="tel:+91987654321">987654321</a></PopoverBody>
                    </Popover>
                </div>
            </div>

        </>

    )
}

export default WorkspaceDetails;