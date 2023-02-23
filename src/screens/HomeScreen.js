import { View } from 'react-native'
import React from 'react'
import Body from '../components/Home/Body'
import HomeHeader from '../components/Home/HomeHeader'

const HomeScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <HomeHeader />
            <Body />
        </View>
    )
}

export default HomeScreen