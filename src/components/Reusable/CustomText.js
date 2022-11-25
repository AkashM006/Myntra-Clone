import { View, Text } from 'react-native'
import React from 'react'

const CustomText = ({ children, fontFamily, style }) => {
    return (<Text style={[style, { fontFamily: fontFamily ?? 'Roboto-Medium' }]}>{children}</Text>)
}

export default CustomText