export default function RegularButton(props) {
    return (
        <button
            className="btn btn--text"
            onClick={props.handleClick}
        >
            {props.children}
        </button>
    )
}