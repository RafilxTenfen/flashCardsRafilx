import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { gray, lightGray } from '../utils/colors'
import {capitalize} from "../utils/helpers";

export default class ItemDeck extends Component {

    render() {

        const { deck, navigation } = this.props

        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.itemContainer}
                                  onPress={() => navigation.navigate(
                                      'DeckIndividual',
                                      { deck: deck.item }
                                  )}
                >
                    <Text style={{fontSize: 25, flexWrap: 'nowrap'}}>
                        {capitalize(deck.item.title)}
                    </Text>
                    <Text style={{color: gray, fontSize: 18}}>
                        {(deck.item.questions) ? (deck.item.questions.length + ' cards') : (0 + ' card')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightGray,
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 3,
        width: 250,
    },

})
