import React from 'react'
import { CardBody, Progress, Card, CardImg, Input, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
const Congrats = (props) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="88">88%</Progress>
                    </div>
                </div>

                <div className="row mt-2 jumbotron">

                    <div className="col-sm-5">

                        <CardImg left width="100%" src="/assets/images/us-thumbsup.png" alt="US thumbs up" />

                    </div>
                    <div className="offset-sm-1 col-sm-5 mt-3 d-sm-flex align-items-center">
                        <Card style={{ width: '100%' }}>
                            <CardBody className="text-center">
                                <p className="lead"><b>Congratulations,</b> {props.businessName}</p>
                                <h2><i>Great! You're all done!</i></h2>
                                <p>Welcome to your new workspace</p>
                                <p>Dowload the lease contract <a href="/assets/files/MembershipCertificate.pdf" download>here</a></p>
                                <p><h3>OR</h3></p>
                                <p>Click <a href="/assets/files/MembershipCertificate.pdf" download>here</a> to receive it on email</p>

                                <FormGroup row>

                                    <div className="offset-sm-2 col-sm-8">
                                        <Input placeholder="Enter Email ID here" className="text-center" key="personEmail" type="email" name="personEmail" id="personEmail"
                                            value={props.personEmail}
                                            onChange={props.handInputChange}
                                            onBlur={props.handleBlur('personEmail')} />
                                    </div>
                                </FormGroup>
                                <p className="lead">Please reach out to your workspace manager John Doe at <a href="tel:+91987654321">987654321</a> for any assistance.</p>
                                <FormGroup row>
                                    <div className="col-sm-12 col-12">
                                        <Link to='/feedback' style={{ textDecoration: 'none' }}><button className="btn btn-block btn-danger">Continue <i class="fa fa-arrow-right"></i></button></Link>
                                    </div>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Congrats