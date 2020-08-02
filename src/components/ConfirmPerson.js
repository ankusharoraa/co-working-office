import React from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Button, Card, CardTitle } from 'reactstrap';
export default function ConfirmPerson(){
    return(
        <>
        <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="50">50%</Progress>
                    </div>
                </div>
            </div>
        </>
    )
}