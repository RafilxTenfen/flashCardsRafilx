import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import DecksTab from './components/DecksTab'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { white, purple} from "./utils/colors";
import NewDeck from "./components/NewDeck"
import { Constants } from 'expo'
import DeckIndividual from "./components/DeckIndividual"
import AddNewCard from './components/AddNewCard'
import StartQuiz from "./components/StartQuiz"
import { setLocalNotification } from "./utils/notifications"

const composeDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeDevtools(
        applyMiddleware(logger, thunk)
    )
)


function UdaciStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


export const Tabs = TabNavigator({
    Decks: {
        screen: DecksTab,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards-outline" size={30} color={tintColor} />
        },
    },
    newDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null,
        title: ''
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})


export const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    DecksTab: {
        screen: DecksTab,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
            }
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    DeckIndividual: {
        screen: DeckIndividual,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                height: 50,
                marginTop: -10
            }
        }
    },
    AddNewCard: {
        screen: AddNewCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                height: 50,
                marginTop: -10
            }
        }
    },
    StartQuiz: {
        screen: StartQuiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                height: 50,
                marginTop: -10
            }
        }
    },

})




export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}
