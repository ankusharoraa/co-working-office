import React,{useEffect,useState} from 'react'
import { Progress, CardImg, Card, CardTitle, CardBody, CardText, CardHeader } from 'reactstrap';
import '../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { withRouter } from 'react-router';



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
    const [cityName, setValue] = useState('');
    const api = 'b66AEKTkYi1s4mGeGzMsXTSKvuC1k72eX9K19LDNElcalA9MaULndGrxs3HsBQUw';
     useEffect(() => {
         async function fetch(){
             let formatZip = props.zipCode.slice(0,5);
             
            //  console.log(formatZip);
            let url = `https://www.zipcodeapi.com/rest/${api}/info.json/${formatZip}/degrees`
            // let url = `https://us-zipcode.api.smartystreets.com/lookup?auth-id=4r08x9wRaGt5vXbNgAYv&zipcode=${formatZip}`
            const res = await axios.get(url);
            const city = res.data.city;
            const state = res.data.state
            setValue(`${city}, ${state}, U.S`);
            console.log(JSON.stringify(res.data));
         }
      fetch();
      });
    const Work = props.workspaceinfo.map((workObj) => {
        return (
            <div className="col-sm-5 mt-3 mb-2 col-12" key={workObj.id}>
                <RenderWorkspace workObj={workObj} zipCode={props.zipCode} cityName = {cityName} />
            </div>
        )
    })
    
     
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
                        <p className = "lead" style={{ fontFamily: "'Courgette', cursive", textAlign: "center", color: "#007bff" }}>Choose a preferred workspace</p>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-sm-5 offset-sm-1 col-12">
                        <p>Showing avalable properties for Date:- <strong>{props.date}</strong> and for <strong>{props.people}</strong> peoples</p>
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