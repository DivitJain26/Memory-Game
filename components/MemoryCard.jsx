/* eslint-disable react/prop-types */
import EmojiButton from './EmojiButton'

export default function MemoryCard(props) {

    let divStyle = {
        marginTop: `${600 / props.data.length}px`
    }
    
    const cardEl = props.data.map((emoji, index) => {

        const selectedCardEntry = props.selectedCards.find(card => card.index === index)
        const matchedCardEntry = props.matchedCards.find(card => card.index === index)

        const cardStyle = matchedCardEntry 
                            ? "card-item--matched" 
                            : selectedCardEntry 
                                ? "card-item--selected" 
                                : ""

        return (
            <div key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton
                    emoji={emoji}
                    index={index}
                    handleClick={() => props.handleClick( index , emoji.name )}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                />
            </div>
        )})
    
    return (
        <div style={divStyle} className="card-container">{cardEl}</div>
    )
}