/* eslint-disable react/prop-types */
import React from 'react'
import RegularButton from './RegularButton'
import Select from './Select'

export default function Form(props) {

    const divRef = React.useRef(null)

    React.useEffect(() => {
        !props.isFirstRender && divRef.current.focus()
    }, []) 

    return (
        <div className="form-container" ref={divRef}>
            <p className="p--regular">
                Customize the game by selecting an emoji category and a number of memory cards.
            </p>
            <form className="wrapper">
                <Select handleChange={props.handleChange} />
                <RegularButton handleClick={props.handleSubmit}>
                    Start Game
                </RegularButton>
            </form>
        </div>
    )
}

