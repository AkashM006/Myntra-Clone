import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import HomeNavigation from '../navigation/HomeNavigation'
import { useSelector } from 'react-redux'

const MainScreen = () => {

    const user = useSelector(state => state.user)

    useEffect(() => {
        console.log("User: ", user)
    }, [user])
    return (
        <View style={{ flex: 1 }}>
            <HomeNavigation />
        </View>
    )
}

export default MainScreen