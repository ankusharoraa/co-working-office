import React, { useEffect } from 'react';
import { CardHeader, CardBody, CardDeck, Progress, Card, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';


let handleSubmit = (event) => {
    event.stopPropagation();

}



let AskInsurance = (duration, updateLeaseDuration, price, updateClickCount) => {

    let insurancePart
    insurancePart = document.getElementById('insurance');
    insurancePart.style.display = 'block'
    insurancePart.scrollIntoView();
    updateLeaseDuration(duration, price)
    let monthly = document.getElementById('monthly');
    let sixMonths = document.getElementById('sixMonths');
    let twelveMonths = document.getElementById('twelveMonths');
    let yesValue = document.getElementById('yes');
    let noValue = document.getElementById('no');
    let oneMonth = document.getElementById('oneButton')
    let sixMonth = document.getElementById('sixButton')
    let twelveMonth = document.getElementById('twelveButton')
    if (duration === '1') {
        oneMonth.innerText = 'CURRENT'
        sixMonth.innerText = 'SELECT'
        twelveMonth.innerText = 'SELECT'
        oneMonth.disabled = true;
        sixMonth.disabled = false;
        twelveMonth.disabled = false
        sixMonth.removeAttribute("style");
        twelveMonth.removeAttribute("style")
        if (oneMonth.disabled) {
            oneMonth.style.fontWeight = '600'
            oneMonth.style.color = 'black'
            oneMonth.style.borderColor = '#aaa'
            oneMonth.style.background = 'transparent'
        }

        monthly.style.webkitTransition = '0.3s'
        monthly.style.transition = '0.3s'
        monthly.style.boxShadow = '0 16px 24px 0 rgba(0,0,0,0.2)'
        sixMonths.style.boxShadow = 'none'
        twelveMonths.style.boxShadow = 'none'
        if (yesValue.checked || noValue.checked) {
            yesValue.checked = false;
            noValue.checked = false;
            updateClickCount();
        }


    }
    else if (duration === '6') {
        oneMonth.innerText = 'SELECT'
        sixMonth.innerText = 'CURRENT'
        twelveMonth.innerText = 'SELECT'
        oneMonth.disabled = false;
        sixMonth.disabled = true;
        twelveMonth.disabled = false;
        oneMonth.removeAttribute("style");
        twelveMonth.removeAttribute("style")
        if (sixMonth.disabled) {
            sixMonth.style.fontWeight = '600'
            sixMonth.style.color = 'black'
            sixMonth.style.borderColor = '#aaa'
            sixMonth.style.background = 'transparent'
        }


        sixMonths.style.webkitTransition = '0.3s'
        sixMonths.style.transition = '0.3s'
        sixMonths.style.boxShadow = '0 16px 24px 0 rgba(0,0,0,0.2)'
        twelveMonths.style.boxShadow = 'none'
        monthly.style.boxShadow = 'none'
        if (yesValue.checked || noValue.checked) {
            yesValue.checked = false;
            noValue.checked = false
            updateClickCount()
        }
    }
    else if (duration === '12') {
        oneMonth.innerHTML = 'SELECT'
        sixMonth.innerHTML = 'SELECT'
        twelveMonth.innerHTML = 'CURRENT'
        oneMonth.disabled = false;
        sixMonth.disabled = false;
        twelveMonth.disabled = true;
        oneMonth.removeAttribute("style");
        sixMonth.removeAttribute("style")
        if (twelveMonth.disabled) {
            twelveMonth.style.fontWeight = '600'
            twelveMonth.style.color = 'black'
            twelveMonth.style.borderColor = '#aaa'
            twelveMonth.style.background = 'transparent'
        }
        twelveMonths.style.webkitTransition = '0.3s'
        twelveMonths.style.transition = '0.3s'
        twelveMonths.style.boxShadow = '0px 16px 24px 0 rgba(0,0,0,0.2)'
        sixMonths.style.boxShadow = 'none'
        monthly.style.boxShadow = 'none'
        if (yesValue.checked || noValue.checked) {
            yesValue.checked = false;
            noValue.checked = false
            updateClickCount()
        }
    }
}



const LeaseTimePeriod = (props) => {
    // const [radioValue, setValue] = useState(0);
    useEffect(() => {
        if (props.selectedLeaseDuration === 0 ||props.selectedLeaseDuration === '') {
            let insurancePart = document.getElementById('insurance');
            insurancePart.style.display = 'none'
            let jumbo = document.getElementById('jumbo');
            jumbo.style.marginBottom = '7%'
        }

        window.onpopstate = e => {
            
            props.updateClickCount();
            let insurancePart = document.getElementById('insurance');
            if(insurancePart!==null){
            insurancePart.style.display = 'none'
            }
            let jumbo = document.getElementById('jumbo');
            if(jumbo!==null){
            jumbo.style.marginBottom = '7%'
            }
        }
        

    });

    let onChange = (e) => {
        props.updateRadioState(e)
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
                <div className="row">
                    <p className="lead"><b>Hello, {props.businessName}</b></p>
                </div>
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
                                    <button id="oneButton" className="btn btn-dark btn-block mt-5" onClick={() => AskInsurance('1', props.updateLeaseDuration, workspacePrice, props.updateClickCount)}>SELECT</button>

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
                                    <button id="sixButton" className="btn btn-dark btn-block mt-5" onClick={() => AskInsurance('6', props.updateLeaseDuration, halfYearlyPrice, props.updateClickCount)}>SELECT</button>
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
                                    <button id="twelveButton" className="btn btn-dark btn-block mt-5" onClick={() => AskInsurance('12', props.updateLeaseDuration, AnnualPrice, props.updateClickCount)}>SELECT</button>
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

                                <Input type="radio" name="radio1" id="yes" value="10" onClick={(e) => onChange(e.target.value)} />
                                    Yes, add policy for ${props.setPremiumAmount}<sub>/mo</sub>

                            </Label>
                        </div>


                    </FormGroup>
                    <FormGroup check>

                        <div className="col-sm-12">
                            <Label check>

                                <Input type="radio" name="radio1" id="no" value="0" onClick={(e) => onChange(e.target.value)} />
                                No
                            </Label>
                        </div>


                    </FormGroup>
                    <FormGroup row>
                        <div className="col-sm-12 col-12 mt-3">
                            <Link style={{ textDecoration: 'none' }} to='payment'><button className="btn btn-dark btn-block mt-5">Proceed to Payment <i className="fa fa-arrow-right" aria-hidden="true"></i></button></Link>
                        </div>
                    </FormGroup>
                </Form>
            </div>
            {/* </div> */}

        </>
    )
}

export default React.memo(LeaseTimePeriod); 