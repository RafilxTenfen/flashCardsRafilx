import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native'
import {black, gray, white} from '../utils/colors'
import { connect } from 'react-redux'


class DeckIndividual extends Component {

    constructor(props){
        super(props)

        this.state = {
            decks: [],
            deck: (props.decks[props.navigation.state.params.deck.title])
                ? (props.decks[props.navigation.state.params.deck.title])
                : {title:'', questions:[]}
        }
    }

    static navigationOptions = ({ navigation }) => {
        const title = {
            title: navigation.state.params.deck.title
        }
            return title
    }

    onPressStart = () => {

        this.setState({
            deck: this.props.decks[this.state.deck.title]
        })

        this.props.navigation.navigate(
            'StartQuiz',
            this.state.deck
        )
    }

    render() {

        const { deck } = this.state
        const questions = this.props.decks[deck.title].questions

        return (
            <ScrollView>
                <View style={styles.scrollView}>
                    <View style={styles.cardView}>
                        <Text style={styles.cardTitle}>
                            {(deck.title)?(deck.title):(this.props.navigation.state.params.deck.title)}
                        </Text>
                        <Text style={styles.cardNumbers}>
                            {(questions) ? (questions.length + ' Cards') : (0 + ' Card')}
                        </Text>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            title='Add Card'
                            style={styles.btnAdd}
                            onPress={() => this.props.navigation.navigate(
                                'AddNewCard',
                                { deck }
                            )}
                        >
                            <Text style={{color: black, fontSize:20}}>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnStart}
                            disabled={
                                (questions)
                                    ?((questions.length > 0)?(false):(true))
                                    : false
                            }
                            onPress={this.onPressStart}
                        >
                            <Text style={{color: white, fontSize:20}}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state, onwProps) {

    return {
        decks: state.decks
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 100,
    },
    cardTitle: {
        fontSize: 30,
        color: black
    },
    cardNumbers: {
        color: gray,
        fontSize: 20
    },
    btnView: {
      flex: 1,
      justifyContent:'space-around',
      alignItems:'center',
      marginTop: 70,
    },
    btnAdd: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        marginBottom: 15,
        marginTop: 15,
        borderColor: black,
        borderRadius:4,
        borderWidth: 2,
        width: 150,
        height: 45,
    },
    btnStart: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: black,
        borderColor: black,
        borderRadius:4,
        borderWidth:2,
        width: 150,
        height: 45,
    }

})

export default connect(mapStateToProps)(DeckIndividual)
