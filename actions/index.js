import * as Api from '../utils/api'
export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_QUESTION = 'ADD_DECK_QUESTION'
export const RESET_DECK = 'RESET_DECK'


export const getDecks = (decks) => ({
    type: GET_DECKS,
    decks
})

export const fetchGetDecks = () => dispatch => (
    Api.getDecks().then((data) => {
                dispatch(getDecks(data))
            })
)

export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
})

export const addDeckTitle = (title) => dispatch => (
        Api.saveDeckTitle(title)
            .then((data) => {
                const deck = {
                    title: title,
                    questions: []
                }
                dispatch(addDeck(deck))
                return data
            })
)

export const addDeckQuestion = (title, question) => ({
    type: ADD_DECK_QUESTION,
    title,
    question
})

export const updateDeckQuestion = (title, question) => dispatch => (
    Api.addQuestionToDeck(title, question)
        .then(data => {
            dispatch(addDeckQuestion(title, question))
            return data
        })
)

export const resetDeck = () => ({
    type: RESET_DECK
})

export const resetDeckStorage = () => dispatch => (
    Api.resetStorage()
        .then(dispatch(resetDeck()))
)
