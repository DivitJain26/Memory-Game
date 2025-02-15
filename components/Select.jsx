/* eslint-disable react/prop-types */
import { data } from "../data/data"
import Option from "./Option"

export default function Select(props) {
    const selectEl = Object.entries(data).map(([ key, value]) => (
        <div key={key} className="form__inner-wrapper">
            <label htmlFor={key}>Select a {key}</label>
            <select
                name={key}
                id={key}
                onChange={props.handleChange}
            >
                < Option valueArray={value} />
            </select>
        </div>
    ))
    
    return (
        <>
           {selectEl}
        </>
    )
}