import React from "react"
import RegularButton from "./RegularButton"

export default function GameOver(props) {

    const divRef = React.useRef(null)

    React.useEffect(() => {
        divRef.current.focus()
    }, [])

    return (
        <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>  
            <p className="p--large">You've matched all the memory cards!</p>
            < RegularButton handleClick={props.handleClick}> 
                Play Again
            </RegularButton>
        </div>
    )
}