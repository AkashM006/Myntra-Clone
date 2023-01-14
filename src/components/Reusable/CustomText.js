import { View, Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const CustomText = ({ children, fontFamily, style, weight, isAnimated }) => {

    const weightList = {
        light: '700',
        bold: '800',
        bolder: '900',
        undefined: '300'
    }

    if (isAnimated && isAnimated === true)
        return (<Animated.Text style={[style, { fontFamily: fontFamily ?? 'EslGothicUnicode_BzdV', fontWeight: weightList[weight] }]}>{children}</Animated.Text>)
    return (<Text style={[style, { fontFamily: fontFamily ?? 'EslGothicUnicode_BzdV' }]}>{children}</Text>)
}

export default CustomText