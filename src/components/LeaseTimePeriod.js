import React from 'react';
import { CardHeader, CardBody, CardDeck, Progress, Card, CardTitle } from 'reactstrap';

// let handleSubmit = (event) => {
//     event.preventDefault();

// }


const LeaseTimePeriod = (props) => {
    let workspacePrice

    for (let i = 0; i < props.workspace.length; i++) {
        if (props.workspace[i].id === parseInt(props.selectedWorkspaceId)) {
            alert("Got it")
            workspacePrice = props.workspace[i].price
        }
    }
    console.log("workspacePrice ---->"+workspacePrice)
    let halfYearlyPrice = parseInt(workspacePrice) - 10;
    let AnnualPrice = parseInt(workspacePrice) - 30;
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="63">63%</Progress>
                    </div>
                </div>
            </div>


            <div className="jumbotron py-3 mt-2">
                <div className="container-fluid py-3">
                    <div className="row py-3">
                        <p className="lead">For how long would you like to lease the workspace?</p>
                    </div>
                    <div className="row">
                        <div className="mx-auto col-sm-12 col-12">
                            <CardDeck>
                                <Card className="price" id="monthly">
                                    <CardHeader className="bg-secondary text-white">
                                        <CardTitle className="text-center">
                                            Monthly
                                  </CardTitle>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <h2 className = "font-weight-normal">${workspacePrice}</h2>
                                    </CardBody>
                                </Card>
                                <Card className="price">
                                    <CardHeader className="bg-dark text-white">
                                        <CardTitle className="text-center">
                                            Half-Yearly (6-Months)
                                  </CardTitle>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <h2 className = "font-weight-normal">${halfYearlyPrice}</h2>
                                    </CardBody>
                                </Card>
                                <Card className="price">
                                    <CardHeader className="bg-primary text-white">
                                        <CardTitle className="text-center">
                                            Annually (12-Months)
                                  </CardTitle>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <h2 className = "font-weight-normal">${AnnualPrice}</h2>
                                    </CardBody>
                                </Card>
                            </CardDeck>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaseTimePeriod