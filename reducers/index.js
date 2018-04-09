import {
    GET_DECKS,
    ADD_DECK,
    ADD_DECK_QUESTION,
    RESET_DECK
} from '../actions'

function decks (state = {}, action) {

    switch (action.type) {
        case GET_DECKS: {
            return {
                ...state,
                decks: action.decks
            }
        }

        case ADD_DECK: {
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deck.title]: action.deck
                }
            }
        }

        case ADD_DECK_QUESTION: {
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        ...state.decks[action.title],
                        questions: (state.decks[action.title].questions)
                                ? (state.decks[action.title].questions.concat(action.question))
                                : ([action.question])
                    }
                }
            }
        }

        case RESET_DECK: {
            return {
                ...state,
                decks: {}
                }
            }

        default :
            return state
    }
}
export default decks