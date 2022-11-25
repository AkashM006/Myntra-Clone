import { View } from 'react-native'
import React from 'react'
import commonStyles from '../styles/Common'
import Body from '../components/Home/Body'

const HomeScreen = () => {
    return (
        <View style={[commonStyles.fullScreen]}>
            <Body />
        </View>
    )
}

export default HomeScreen