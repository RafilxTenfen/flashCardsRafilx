import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import { white} from '../utils/colors'

class SeparatorDecks extends Component {

    render() {
        return (
            <View style={styles.separator}/>
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        backgroundColor: white,
        height: 10,
    }
})


export default SeparatorDecks