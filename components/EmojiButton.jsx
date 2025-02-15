/* eslint-disable react/prop-types */
import {decodeEntity} from 'html-entities'

export default function EmojiButton(props) {

    const btnContent = props.selectedCardEntry || props.matchedCardEntry ? decodeEntity(props.emoji.htmlCode[0]) : "?"

    const btnStyle = props.matchedCardEntry 
                        ? "btn--emoji__back--matched" 
                        : props.selectedCardEntry 
                            ? "btn--emoji__back--selected" 
                            : "btn--emoji__front"
    
    const btnAria = props.matchedCardEntry 
                        ? `${decodeEntity(props.emoji.name)}. Matched.` 
                        : props.selectedCardEntry 
                            ? `${decodeEntity(props.emoji.name)}. Not matched yet.` 
                            : "Card upside down."
    
    return (
        <button
            className={`btn btn--emoji ${btnStyle}`}
            onClick={props.selectedCardEntry ? null : props.handleClick}
            disabled = {props.matchedCardEntry}
            aria-label={`Position ${props.index + 1}: ${btnAria}`}
            aria-live="polite"
        >
            {btnContent}
        </button>
    )
}