import React from 'react';

export default function Footer(props){
    let date = new Date();
    let year = date.getFullYear()

return(
    <div className = "footer">
        <p>© Copyright Co-Working Space {year}</p>
    </div>
)
}