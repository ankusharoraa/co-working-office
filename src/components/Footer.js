import React from 'react';
function Footer(props){
    let date = new Date();
    let year = date.getFullYear()

return(
    <div className = "footer">
        <p>© Capgemini <img src = "/assets/images/cgLogo.png" alt = "Cg logo" style = {{height : '20px', width : '20px'}}></img> {year}. All rights reserved.</p>
    </div>
)
}
export default React.memo(Footer)