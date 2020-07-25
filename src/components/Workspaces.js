import React from 'react'
import { Progress,CardImg,Card,CardTitle, CardBody,CardText, CardHeader } from 'reactstrap';
import '../App.css'
import { Link} from 'react-router-dom';
// import { withRouter } from 'react-router';

function RenderWorkspace ({workObj,zipCode}){
    return (
        <Card>
            <Link style = {{textDecoration : 'none'}} to ={`/workspace/${workObj.id}`} >
            <CardHeader>
                <CardTitle>{workObj.name}</CardTitle>
            </CardHeader>
            <CardImg top height = "375px" src={workObj.image} alt={workObj.name} />
           
            </Link>
            <CardBody>
    <CardTitle>from ${workObj.price}/mo</CardTitle>
    {/* <CardSubtitle>{workObj.distance} {workObj.description} {zipCode}</CardSubtitle> */}
    <CardText>
            <small className="text-muted">{workObj.distance} {workObj.description} {zipCode}</small>
          </CardText>
          </CardBody>
            
        </Card>
    );
}

let value = 100 / 8;
let floor = Math.floor(value);
const Workspace = (props) => {
    const Work = props.workspaceinfo.map((workObj) => {
        return (
            <div className="col-sm-5 mt-3 mb-2 col-12" key={workObj.id}>
                <RenderWorkspace workObj={workObj} zipCode = {props.zipCode}/>
            </div>
        )
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated = {true} striped color="primary" value={value}>{floor}%</Progress>
                    </div>
                </div>
                <div className = "row mt-2">
                <div className="col-sm-12">
                    <h2 style = {{fontFamily : "'Courgette', cursive",textAlign : "center",color : "blue"}}>Choose a preferred workspace</h2>
                    </div>
                </div>
                <div className = "row mt-2 d-flex justify-content-center">
                <div className="col-sm-12">
                    <p>Showing results for</p>
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