import React from 'react'
import Rating from 'react-rating'
import { CardBody, Progress, Card, Input, FormGroup, CardHeader, CardTitle } from 'reactstrap';

const FeedbackComp = (props) => {
   let handleValue = (value) =>{
    console.log(value)
    }
    let backToHome = () =>{
        window.location.reload();
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="100">Done</Progress>
                    </div>
                </div>
            </div>
            <div className="jumbotron">

                <div className="container">
                    <div className = "row">
                        <div className = "offset-sm-2 col-sm-8">
                    <Card>
                        <CardHeader className="bg-primary text-center">
                            <CardTitle className = "text-white">Feedback Form</CardTitle>
                        </CardHeader>
                        <CardBody className="text-center">
                            <h3>Tell us about your experience !</h3>
                            <p className="mt-5 lead">How would you rate your overall experience?</p>
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                fractions={2}
                                onClick = {(value)=>handleValue(value)}
                    
                            />
                            <p className = "lead mt-3">Any other comments?</p>
                            <FormGroup className = "offset-sm-2 col-sm-8">
                                <Input type = 'textarea' style ={{height : '200px',width : '100%'}} />
                            </FormGroup>
                            <FormGroup row>
                            <div className="offset-sm-4 col-sm-4">
                                       <button className="btn btn-block btn-primary" onClick = {backToHome}>Submit</button>
                                    </div>
                            </FormGroup>
                        </CardBody>

                    </Card>
                </div>
            </div>
            </div>
            </div>

        </>
    )
}
export default React.memo(FeedbackComp);