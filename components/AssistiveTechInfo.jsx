export default function AssistiveTechInfo(props) {
    return (
        <section className="sr-only" aria-live="polite" aria-atomic="true">
            <h2>Game status</h2> 
            <p>Number of matched pairs: {props.matchedCards.length / 2}</p>
            <p>Number of cards left to match: {props.emojisData.length - props.matchedCards.length} </p>
        </section>
    )
}