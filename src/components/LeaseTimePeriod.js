import React, { useEffect,useState } from 'react';
import { CardHeader, CardBody, CardDeck, Progress, Card, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';


let handleSubmit = (event) => {
    event.stopPropagation();

}



let AskInsurance = (duration, updateLeaseDuration, price) => {
    
    let insurancePart
    insurancePart = document.getElementById('insurance');
    insurancePart.style.display = 'block'
    insurancePart.scrollIntoView();
    updateLeaseDuration(duration, price)
    let monthly = document.getElementById('monthly');
    let sixMonths = document.getElementById('sixMonths');
    let twelveMonths = document.getElementById('twelveMonths');
    if (duration === '1') {

        monthly.style.webkitTransition = '0.3s'
        monthly.style.transition = '0.3s'
        monthly.style.boxShadow = '0 16px 24px 0 rgba(0,0,0,0.2)'
        sixMonths.style.boxShadow = 'none'
        twelveMonths.style.boxShadow = 'none'


    }
    else if (duration === '6') {

        sixMonths.style.webkitTransition = '0.3s'
        sixMonths.style.transition = '0.3s'
        sixMonths.style.boxShadow = '0 16px 24px 0 rgba(0,0,0,0.2)'
        twelveMonths.style.boxShadow = 'none'
        monthly.style.boxShadow = 'none'
    }
    else if (duration === '12') {

        twelveMonths.style.webkitTransition = '0.3s'
        twelveMonths.style.transition = '0.3s'
        twelveMonths.style.boxShadow = '0px 16px 24px 0 rgba(0,0,0,0.2)'
        sixMonths.style.boxShadow = 'none'
        monthly.style.boxShadow = 'none'
    }
}



const LeaseTimePeriod = (props) => {
    const [radioValue, setValue] = useState(0);
    useEffect(() => {
        if (props.selectedLeaseDuration === '') {
            let insurancePart = document.getElementById('insurance');
            insurancePart.style.display = 'none'
            let jumbo = document.getElementById('jumbo');
            jumbo.style.marginBottom = '7%'
        }
        
    });

    let onChange = (e) =>{
        setValue(parseInt(e))
        console.log(e)
    }

    let workspacePrice
    let workspaceFac
    let facilities = []
    for (let i = 0; i < props.workspace.length; i++) {
        if (props.workspace[i].id === parseInt(props.selectedWorkspaceId)) {
            // alert("Got it")
            workspacePrice = props.workspace[i].price
            workspaceFac = props.workspace[i].details
        }
    }
    for (let i = 0; i < workspaceFac.length; i++) {
        facilities.push(
            <>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">{workspaceFac[i]}
                    </li>
                   
                </ul>
            </>
        )
    }
    console.log("workspacePrice ---->" + workspacePrice)
    // console.log("workspaceFac ---->" + workspaceFacAvail)
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


            <div className="container py-3" id="jumbo">
                <div className="row py-3">
                    <p className="lead ml-3">For how long would you like to lease the workspace?</p>
                </div>
                <div className="row">
                    <div className="mx-auto col-sm-12 col-12">
                        <CardDeck>
                            <Card className="price" id="monthly">

                                <CardHeader className="bg-dark text-white">
                                    <CardTitle className="text-center">
                                        Monthly
                                  </CardTitle>
                                </CardHeader>

                                <CardBody className="text-center jumbotron">

                                    <h2 className="font-weight-normal"><sup>$</sup>{workspacePrice}<sub><small className="text-muted">/30 days</small></sub></h2>
                                    <h4 className="mt-5 lead">Office Facilities:</h4>
                                    <div className="mt-3">
                                        {facilities}
                                    </div>
                                    <button className="btn btn-dark btn-block mt-5" onClick={() => AskInsurance('1', props.updateLeaseDuration, workspacePrice)}>SELECT</button>

                                </CardBody>

                            </Card>

                            <Card className="price" id="sixMonths">
                                <CardHeader className="bg-dark text-white">
                                    <CardTitle className="text-center">
                                        Half-Yearly (6-Months)
                                  </CardTitle>
                                </CardHeader>
                                <CardBody className="text-center jumbotron">
                                    <h2 className="font-weight-normal"><sup>$</sup>{halfYearlyPrice}<sub><small className="text-muted">/30 days</small></sub></h2>
                                    <h4 className="mt-5 lead">Office Facilities:</h4>
                                    <div className="mt-3">
                                    {facilities}
                                    </div>
                                    <button className="btn btn-dark btn-block mt-5" onClick={() => AskInsurance('6', props.updateLeaseDuration, halfYearlyPrice)}>SELECT</button>
                                </CardBody>
                            </Card>
                            <Card className="price" id="twelveMonths">
                                <CardHeader className="bg-dark text-white">
                                    <CardTitle className="text-center">
                                        Annually (12-Months)
                                  </CardTitle>
                                </CardHeader>
                                <CardBody className="text-center jumbotron">
                                    <h2 className="font-weight-normal"><sup>$</sup>{AnnualPrice}<sub><small className="text-muted">/30 days</small></sub></h2>
                                    <h4 className="mt-5 lead">Office Facilities:</h4>
                                    <div className="mt-3">
                                    {facilities}
                                    </div>
                                    <button className="btn btn-dark btn-block mt-5" onClick={() => AskInsurance('12', props.updateLeaseDuration, AnnualPrice)}>SELECT</button>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
            </div>

            {/* <div className="jumbotron py-3 mt-2" id = "jumbo"> */}
            <div className="container" id="insurance">
                <p id="knowMore" className="lead">Add general liability insurance for your  business? (<a href='#knowMore'><i>Know more</i></a>)</p>
                <Form onSubmit={handleSubmit}>
                    <FormGroup check>

                        <div className="col-sm-12">
                            <Label check>

                                <Input type="radio" name="radio1" id = "yes" value = "10" onClick = {(e)=>onChange(e.target.value)}/>
                                    Yes, add policy for $10<sub>/mo</sub>

                            </Label>
                        </div>


                    </FormGroup>
                    <FormGroup check>

                        <div className="col-sm-12">
                            <Label check>

                                <Input type="radio" name="radio1" id = "no" value = "0" onClick = {(e)=>onChange(e.target.value)} />
                                No
                            </Label>
                        </div>


                    </FormGroup>
                    <FormGroup row>
                    <div className="col-sm-12 col-12 mt-3">
                    <Link style={{ textDecoration: 'none' }} to = 'payment'><button className="btn btn-dark btn-block mt-5">Proceed to Payment <i className="fa fa-arrow-right" aria-hidden="true"></i></button></Link>
                    </div>
                    </FormGroup>
                </Form>
            </div>
            {/* </div> */}

        </>
    )
}

export default LeaseTimePeriod