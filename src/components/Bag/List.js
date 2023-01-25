import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CountContainer from './CountContainer'
import Card from './Card'
import PopUp from './PopUp'
import Overlay from '../Reusable/Overlay'
import { useState } from 'react'

const List = () => {
    const { colors } = useSelector(state => state.theme)
    const { count, items, selected } = useSelector(state => state.bag)
    const [showPopUp, setShowPopUp] = useState(false)

    return (
        <View style={styles.container}>
            <CountContainer />
            <FlatList
                data={items}
                renderItem={({ item }) => <Card item={item} />}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <PopUp render={showPopUp} />
            <Overlay render={showPopUp} hideLoader onPressHandler={() => setShowPopUp(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3.5%',
        marginTop: 20,
    }
})

export default List