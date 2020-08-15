import React from 'react'
import { Progress, CardImg, Card, CardTitle, CardBody, CardText, CardHeader } from 'reactstrap';
import '../App.css'
import { Link } from 'react-router-dom';




function RenderWorkspace({ workObj, zipCode, cityName }) {

    return (
        <Card>
            <Link style={{ textDecoration: 'none' }} to={`/workspaces/${workObj.id}`} >
                <CardHeader>
                    <CardTitle>{workObj.name}</CardTitle>
                </CardHeader>
                <CardImg top height="375px" src={workObj.image} alt={workObj.name} />


                <CardBody>
                    <CardTitle>from ${workObj.price}/mo</CardTitle>
                    {/* <CardSubtitle>{workObj.distance} {workObj.description} {zipCode}</CardSubtitle> */}
                    <CardText>
                        <small className="text-muted">{workObj.distance} {workObj.description} {zipCode}({cityName})</small>
                    </CardText>
                </CardBody>
            </Link>
        </Card>
    );

}

let outputValue = () => {
    let val = document.getElementById("price").value;
    document.getElementById("ageOutputId").innerHTML = '$' + val;
}

const Workspace = (props) => {
    // const Work = props.workspaceinfo.map((workObj) => {
    //     return (
    //         <div className="col-sm-5 mt-3 mb-2 col-12" key={workObj.id}>
    //             <RenderWorkspace workObj={workObj} zipCode={props.zipCode} cityName = {props.location} />
    //         </div>
    //     )
    // })
    const Work = []
    for (let i = 0; i < props.workspaceinfo.length; i++) {
        if (props.workspaceinfo[i].zipCode === props.zipCode) {
            Work.push(
                <div className="col-sm-5 mt-3 mb-2 col-12">
                    <RenderWorkspace workObj={props.workspaceinfo[i]} zipCode={props.zipCode} cityName={props.location} />
                </div>
            )
        }
        if((props.zipCode !== '10007' && props.zipCode !== '94111' && props.zipCode !== '60603')){
            if(props.workspaceinfo[i].zipCode === ''){
            Work.push(
                <div className="col-sm-5 mt-3 mb-2 col-12">
                    <RenderWorkspace workObj={props.workspaceinfo[i]} zipCode={props.zipCode} cityName={props.location} />
                </div>
            ) 
            }
        }
        // else {
        //     Work.push(
        //         <div className="col-sm-5 mt-3 mb-2 col-12">
        //             <RenderWorkspace workObj={props.workspaceinfo[i]} zipCode={props.zipCode} cityName={props.location} />
        //         </div>
        //     )
        // }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="12">12%</Progress>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <p className="lead" style={{ fontFamily: "'Courgette', cursive", textAlign: "center", color: "#007bff" }}>Choose a preferred workspace</p>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-sm-5 offset-sm-1 col-12">
                        <p>Showing avalable properties for Date:- <strong>{props.setDate}</strong> and for <strong>{props.people}</strong> peoples</p>
                    </div>
                    <div className="col-sm-4 offset-sm-2 col-12">
                        <label for="price"><strong>Price Range (<i class="fa fa-usd" aria-hidden="true"></i>) :- </strong>  </label>
                        <output className="ml-3 mr-1">Min</output>
                        <input type="range" id="price" name="price" min="1000" max="5000" defaultValue="1000" step="10" onChange={outputValue} />
                        <output className="ml-1" name="ageOutputName" id="ageOutputId">$5000</output>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">

                    {Work}

                </div>
            </div>
        </>
    )
}


export default Workspace