import { AsyncStorage } from 'react-native'

const STORAGE_DECKS_KEY = 'FlashCards:decks';


export function  getDecks() {
    return AsyncStorage.getItem(STORAGE_DECKS_KEY)
        .then((data) => JSON.parse(data))
}

export function saveDeckTitle(title) {
    return AsyncStorage.getItem(STORAGE_DECKS_KEY)
        .then((data) => {
            let decks = data ? JSON.parse(data) : {}

            decks = {
                ...decks,
                [title]: {
                    title: title,
                    questions: []
                }
            }

            return AsyncStorage.setItem(STORAGE_DECKS_KEY, JSON.stringify(decks))
        })
}

export function addQuestionToDeck(title, question) {
    return AsyncStorage.getItem(STORAGE_DECKS_KEY)
        .then((data) => {
            let decks = data ? JSON.parse(data) : {}

                decks = {
                    ...decks,
                    [title]: {
                        ...decks[title],
                        questions:(decks[title].questions.length > 0)
                            ? decks[title].questions.concat(question)
                            : [question]
                    }
                }


            return AsyncStorage.setItem(STORAGE_DECKS_KEY, JSON.stringify(decks))
        })
}

export function resetStorage() {
    return AsyncStorage.setItem(STORAGE_DECKS_KEY, JSON.stringify({}))
}
