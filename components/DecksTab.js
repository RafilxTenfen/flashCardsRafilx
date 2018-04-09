import React from 'react'
import { StyleSheet, Text, View , FlatList, Button} from 'react-native'
import { connect } from 'react-redux'
import {fetchGetDecks, resetDeckStorage} from "../actions";
import ItemDeck from "./ItemDeck";
import {purple, white} from "../utils/colors";
import SeparatorDecks from "./SeparatorDecks";

class DecksTab extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            decks: []
        }
    }

    componentDidMount(){
        this.props.getDecks()
    }

    renderItemDeck = (deck, index) => {
        return (
            <ItemDeck deck={deck} key={deck.title} navigation={this.props.navigation} />
        )
    }

    _keyExtractor = (item, index) => index;

    _listEmptyItem = () => {
        return(
            <View style={styles.container} key='empty'>
                <Text style={{marginTop: 50, fontSize: 18}}>
                    There is no Decks
                </Text>
            </View>
        )
    }

    handleResetBtn = (e) => {
        e.preventDefault()
        this.props.resetDecks()
    }

    render() {

        const decks = this.props.decks

        return (
            <View style={styles.container}>
                <View style={styles.separator}/>
                <FlatList
                    data={decks}
                    renderItem={this.renderItemDeck}
                    ListEmptyComponent={this._listEmptyItem}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={SeparatorDecks}
                />
                <View style={styles.separator}/>
                <Button
                    onPress={this.handleResetBtn}
                    title='RESET'
                    color={purple}
                />
                <View style={styles.separator}/>
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        decks: state.decks ? Object.keys(state.decks).map((key) => {
            return state.decks[key]
        }) : []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => dispatch(fetchGetDecks()),
        resetDecks: () => dispatch(resetDeckStorage())
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        backgroundColor: white,
        height: 10,
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DecksTab)


