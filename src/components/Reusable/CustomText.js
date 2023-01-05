import { View, Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const CustomText = ({ children, fontFamily, style, isAnimated }) => {
    if (isAnimated && isAnimated === true)
        return (<Animated.Text style={[style, { fontFamily: fontFamily ?? 'EslGothicUnicode_BzdV' }]}>{children}</Animated.Text>)
    return (<Text style={[style, { fontFamily: fontFamily ?? 'EslGothicUnicode_BzdV' }]}>{children}</Text>)
}

export default CustomText