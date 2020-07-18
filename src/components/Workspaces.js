import React,{Component} from 'react'
import { withRouter } from 'react-router';
class Workspace extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <h1>Hi</h1>
            </>
        )
    }
}

export default withRouter(Workspace)