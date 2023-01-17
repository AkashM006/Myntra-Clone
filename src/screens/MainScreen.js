import { View } from 'react-native'
import React from 'react'
import HomeNavigation from '../navigation/HomeNavigation'
import { useSelector } from 'react-redux'

const MainScreen = () => {

    const user = useSelector(state => state.user)

    return (
        <View style={{ flex: 1 }}>
            <HomeNavigation />
        </View>
    )
}

export default MainScreen