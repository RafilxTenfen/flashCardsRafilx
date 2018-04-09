import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {black, white} from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { updateDeckQuestion } from '../actions/index'

class AddNewCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            question: '',
            answer: ''
        }

    }

    static navigationOptions = ({navigation}) => {
        const title = {
            title: `Add Card to ${navigation.state.params.deck.title}`
        }
        return title
    }

    cleanInputs = () => {
        this.setState({
            question: '',
            answer: ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if(this.state.question !== '' && this.state.answer !== ''){
            const question = {
                question: this.state.question,
                answer: this.state.answer
            }
            this.props.addQuestion(this.props.navigation.state.params.deck.title, question)
                .then(() => {
                    this.props.navigation.dispatch(NavigationActions.back())
                })
            this.setState({
                question: '',
                answer: ''
            })
        }
    }

    handleChangeQuestion = (question) => {
        if(question)
            this.setState({question: question})
    }

    handleChangeAnswer = (answer) => {
        if(answer)
            this.setState({answer: answer})
    }

    isEmptyQuestionAnswer(){
        let bRetorno = true
        if((this.state.answer !== '') || (this.state.question !== ''))
            bRetorno = false
        return bRetorno
    }

    render() {
        const { question, answer } = this.state

        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView
                    style={styles.keyboardView}
                >
                    <TextInput
                        placeholder='New Question'
                        value={question}
                        onChangeText={this.handleChangeQuestion}
                        style={styles.inputTextQuestion}
                    />
                    <TextInput
                        placeholder='The Answer'
                        value={answer}
                        onChangeText={this.handleChangeAnswer}
                        style={styles.inputTextAnswer}
                        onSubmitEditing={this.handleSubmit}
                    />
                </KeyboardAvoidingView>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={styles.btnSubmit}
                        onPress={this.handleSubmit}
                    >
                        <Text style={{color: black, fontSize: 20}}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnClean}
                        disabled={this.isEmptyQuestionAnswer()}
                        onPress={this.cleanInputs}
                    >
                        <Text style={{color: white, fontSize: 20}}>Clean</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    keyboardView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    btnView: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: -20
    },
    btnSubmit: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        marginBottom: 15,
        borderColor: black,
        borderRadius: 4,
        borderWidth: 2,
        width: 120,
        height: 45,
    },
    btnClean: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: black,
        marginBottom: 15,
        borderColor: black,
        borderRadius: 4,
        borderWidth: 2,
        width: 120,
        height: 45,
    },
    inputTextQuestion: {
        marginLeft: 2,
        paddingLeft: 4,
        height: 50,
        width: 250,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 15
    },
    inputTextAnswer: {
        marginLeft: 2,
        paddingLeft: 4,
        height: 50,
        width: 250,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16
    }

})

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: (title, question) => dispatch(updateDeckQuestion(title, question))
    }
}

export default connect(null, mapDispatchToProps)(AddNewCard)