/* eslint-disable react/prop-types */
import React from "react"
import RegularButton from "./RegularButton"

export default function ErrorCard(props) {

    const divRef = React.useRef(null)
        
    React.useEffect(() => {
        divRef.current.focus()
    }, [])

    return (
        <div 
            className="wrapper wrapper--accent" 
            ref={divRef} 
            tabIndex={-1}
        >
            <p className="p--large">Sorry, there was an error.</p>
            <p className="p--regular">Please come back later or click the button below to try restarting the game.</p>
            <RegularButton 
                handleClick={props.handleClick}
            > 
                Restart game
            </RegularButton>
        </div>
    )
}