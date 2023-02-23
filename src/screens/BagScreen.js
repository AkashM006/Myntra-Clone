import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Bag/Header'
import BagBody from '../components/Bag/BagBody'

const BagScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <BagBody />
        </View>
    )
}

export default BagScreen