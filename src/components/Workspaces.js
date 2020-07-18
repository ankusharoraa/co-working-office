import React,{Component} from 'react'
// import { withRouter } from 'react-router';
class Workspace extends Component{

    render(){
        return(
            <>
            <h1>{this.props.zipCode}</h1>
            </>
        )
    }
}

export default Workspace