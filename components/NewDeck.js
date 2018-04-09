import React from 'react'
import {addDeckTitle} from '../actions'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import {purple} from "../utils/colors"
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {capitalize} from "../utils/helpers";

class NewDeck extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    handleChangeText = (title) => {
        this.setState({title: title})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if(this.state.title !== ''){
            this.props.addDeck(capitalize(this.state.title))
                .then((data) => {
                    this.props.navigation.dispatch(NavigationActions.back())
                    this.setState({
                        title: ''
                    })
                })
        }
    }

    render() {

        const { title } = this.state

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.form}
                >
                    <Text style={styles.textTitle}>
                        What is the title of your new Deck?
                    </Text>
                    <TextInput
                        placeholder="New Deck's Title"
                        style={styles.inputText}
                        onChangeText={this.handleChangeText}
                        value={title}
                        onSubmitEditing={this.handleSubmit}
                    />
                    <Button
                        onPress={this.handleSubmit}
                        title='Submit'
                        color={purple}
                    />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        flex: 0.8,
        marginTop: -15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 10,
    },
    inputText: {
        marginLeft: 2,
        paddingLeft: 4,
        height: 45,
        width: 200,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 15
    }
})

function mapDispatchToProps(dispatch) {
    return {
        addDeck: (title) => dispatch(addDeckTitle(title))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(NewDeck)