import React from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import AssistiveTechInfo from '../components/AssistiveTechInfo'
import GameOver from '../components/GameOver'
import ErrorCard from '../components/ErrorCard'

export default function App() {
    const initialFormData = {
        category: "animals-and-nature",
        number: 10
    }
    const [formData, setFormData] = React.useState(initialFormData)
    const [isGameOn, setIsGameOn] = React.useState(false)
    const [emojisData, setEmojisData] = React.useState([])
    const [selectedCards, setSelectedCards] = React.useState([])
    const [matchedCards, setMatchedCards] = React.useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [isFirstRender, setIsFirstRender] = React.useState(true)

    // console.log(emojisData)
    // console.log(selectedCards)
    // console.log(matchedCards)
    // console.log(isError)

    React.useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
            setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
        }
    }, [selectedCards])

    React.useEffect(() => {
        if (emojisData.length && matchedCards.length === emojisData.length) {
            setAreAllCardsMatched(true)
        }
    }, [matchedCards])

    async function startGame(e) {
        e.preventDefault()
        try {

            const response = await fetch("https://emojihub.yurace.pro/api/all/category/" + formData.category)
            if (!response.ok) {
                throw new Error("Could not fetch data from API")
            }

            const data = await response.json()
            const dataSlice = getDataSlice(data)
            const emojisArray = getEmojisArray(dataSlice)

            setEmojisData(emojisArray)
            setIsGameOn(true)
        } catch (error) {
            console.error(error)
            setIsError(true)
        } finally {
            setIsFirstRender(false)
        }
    }

    function resetGame() {
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
    }

    function getDataSlice(data) {
        const randomIndices = getRandomIndices(data)
        const dataSlice = randomIndices.map(index => data[index])
        return dataSlice
    }

    function getRandomIndices(data) {
        const randomIndicesArray = []

        while (randomIndicesArray.length < formData.number / 2) {
            const num = Math.floor(Math.random() * data.length)

            if (!randomIndicesArray.includes(num)) {
                randomIndicesArray.push(num)
            }
        }

        return randomIndicesArray
    }

    function getEmojisArray(data) {
        const pairedEmojisArray = [...data, ...data]

        for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [pairedEmojisArray[i], pairedEmojisArray[j]] = [pairedEmojisArray[j], pairedEmojisArray[i]];
        }

        return pairedEmojisArray
    }

    function turnCard(index, name) {
        if (selectedCards.length < 2) {
            setSelectedCards(prevSelectedCards => [...prevSelectedCards, { index, name }])
        } else if (selectedCards.length === 2) {
            setSelectedCards([{ index, name }])
        }
    }

    function resetError() {
        setIsError(false)
    }

    function handleFormChange(e) {
        // console.log(e.target.name + ": " + e.target.value)
        setFormData(prevData => ({...prevData, [e.target.name]: e.target.value}))
    }

    return (
        <main>
            <h1>Memory</h1>

            {!isGameOn && !isError && 
                <Form 
                    handleSubmit={startGame} 
                    handleChange={handleFormChange}
                    isFirstRender={isFirstRender}
                />
            }

            {isGameOn && !areAllCardsMatched &&
                < AssistiveTechInfo
                    emojisData={emojisData}
                    matchedCards={matchedCards}
                />
            }

            {areAllCardsMatched &&
                < GameOver 
                    handleClick={resetGame} 
                />
            }

            {isGameOn &&
                < MemoryCard
                    handleClick={turnCard}
                    data={emojisData}
                    selectedCards={selectedCards}
                    matchedCards={matchedCards}
                />
            }

            {isError && <ErrorCard handleClick={resetError} />}

        </main>
    )
}