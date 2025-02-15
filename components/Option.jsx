/* eslint-disable react/prop-types */
export default function Option(props) {
    const optionEl = props.valueArray.map(({name, value}) => (
        <option key={value} value={value}>
            {name ? name : value}
        </option>
    ))

    return (
        <>
            {optionEl}
        </>
    )
}