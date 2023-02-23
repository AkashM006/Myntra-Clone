import { View, } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import ICONS from '../icons/icons'

const LoadingScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <FastImage
                source={{ uri: ICONS.ICON_SPLASH }}
                style={{ flex: 1 }}
            />
        </View>
    )
}

export default LoadingScreen