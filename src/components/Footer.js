import React from 'react';
import logo from '../images/cgLogo.png'
export default function Footer(props){
    let date = new Date();
    let year = date.getFullYear()

return(
    <div className = "footer">
        <p>© Capgemini <img src = {logo} alt = "Cg logo" style = {{height : '20px', width : '20px'}}></img> {year}. All rights reserved.</p>
    </div>
)
}