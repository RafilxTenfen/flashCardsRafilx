import React , { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {black, white, green, red} from "../utils/colors"
import { connect } from 'react-redux'
import {clearLocalNotification, setLocalNotification} from "../utils/notifications";

class StartQuiz extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deck: (props.deck)
                ? (props.deck)
                : {title: '', questions: []},
            index: 0,
            corrects: 0,
            bAnswer: false
        }
    }

    static navigationOptions = ({navigation}) => {
        const title = {
            title: `${navigation.state.params.title}'s Quiz`
        }
        return title
    }

    onPressIncorrect = () => {
        this.setState({
            index: this.state.index + 1,
            bAnswer: false,
        })
    }

    onPressCorrect = () => {
        this.setState({
            index: this.state.index + 1,
            corrects: this.state.corrects + 1,
            bAnswer: false,
        })
    }

    onPressFinalHome = () => {
        this.finalizouQuiz()

        this.setState({
            index: 0,
            corrects: 0,
            bAnswer: false
        })

        this.props.navigation.navigate('DeckIndividual',
            {deck: this.state.deck})
    }

    onPressRestartQuiz = () => {
        this.finalizouQuiz()
        this.setState({
            index: 0,
            corrects: 0,
            bAnswer: false
        })
    }

    finalizouQuiz = () => {
        if(this.state.index === this.state.deck.questions.length){
            clearLocalNotification()
                .then(setLocalNotification)
        }
    }

    render() {
        const {deck, index, bAnswer, corrects} = this.state

        return (
            <View style={styles.container}>
                {(index < deck.questions.length)
                    ? <View style={{flex: 1}}>
                        <View style={styles.topView}>
                            <Text style={{textAlign: 'left', fontSize: 22}}>
                                {(index + 1).toString() + ' / ' + deck.questions.length}</Text>
                        </View>
                        <View style={styles.questionView}>
                            {(!bAnswer)
                                ? <View style={{flex: 1}}>
                                    <Text style={styles.textQuestion}
                                    >{deck.questions[index].question}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({bAnswer: true})
                                        }}
                                        style={styles.btnQuestionAnswer}
                                    >
                                        <Text style={styles.textBtnQuestion}>Answer</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{flex: 1}}>
                                    <Text style={styles.textQuestion}
                                    >{deck.questions[index].answer}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({bAnswer: false})
                                        }}
                                        style={styles.btnQuestionAnswer}
                                    >
                                        <Text style={styles.textBtnQuestion}>Question</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                disabled={!bAnswer}
                                style={styles.btnCorrect}
                                onPress={this.onPressCorrect}
                            >
                                <Text style={{color: white, fontSize: 18}}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!bAnswer}
                                style={styles.btnIncorrect}
                                onPress={this.onPressIncorrect}
                            >
                                <Text style={{color: white, fontSize: 18}}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.finalView}>
                        <Text style={styles.textPercent}
                        >Your percentage of correct questions is</Text>
                        <Text style={styles.textQuestion}>
                            {(corrects > 0)
                                ? ((100 / deck.questions.length) * corrects).toFixed(2)
                                : (0.00).toString()} %</Text>
                        <TouchableOpacity
                            style={styles.btnHome}
                            onPress={this.onPressFinalHome}
                        >
                            <Text style={{fontSize: 20, color: white}}>Back to Deck</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnHome}
                            onPress={this.onPressRestartQuiz}
                        >
                            <Text style={{fontSize: 20, color: white}}>Restart Quiz</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state, onwProps) {

    return {
        deck: state.decks[onwProps.navigation.state.params.title]
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    topView: {
        flex: 1,
        marginTop: 15,
        marginLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        backgroundColor: white,
        maxHeight: 30,
    },
    questionView: {
        flex: 1,
        justifyContent:'center',
        textAlign: 'center',
        marginTop: 60,
        paddingTop: 25,
    },
    textQuestion: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textBtnQuestion: {
        fontSize:18,
        color: red,
    },
    btnView: {
        flex: 1,
        justifyContent:'center',
        marginTop: 20
    },
    btnCorrect: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: green,
        marginBottom: 15,
        marginTop: 15,
        borderColor: black,
        borderRadius:4,
        borderWidth: 2,
        width: 150,
        height: 30,
        marginLeft: 110,
    },
    btnIncorrect: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: red,
        marginBottom: 15,
        marginTop: 15,
        borderColor: black,
        borderRadius:4,
        borderWidth: 2,
        width: 150,
        height: 30,
        marginLeft: 110,
    },
    btnHome: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: black,
        marginBottom: 15,
        marginTop: 15,
        borderColor: black,
        borderRadius:4,
        borderWidth: 2,
        width: 150,
        height: 25,
        marginLeft: 110,
    },
    finalView: {
        flex: 1,
        justifyContent: 'center',
        fontSize:25
    },
    textPercent: {
        fontSize: 20
    },
    btnQuestionAnswer: {
        borderColor: '#DDDDDD',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderWidth:1,
        width: 80,
        height: 35,
        fontSize: 20,
        marginLeft: 135,
        marginTop: 10,
        marginBottom: 10,
    }
})

export default connect(mapStateToProps)(StartQuiz)