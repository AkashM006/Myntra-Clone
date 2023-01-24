import { Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'

const CustomText = ({ children, fontFamily, style, weight, isAnimated, size, color, top, bottom, left, right, vertical, horizontal, align }) => {

    const { colors } = useSelector(state => state.theme)

    const weightList = {
        light: '700',
        bold: '800',
        bolder: '900',
        undefined: '300'
    }

    const styles = {
        fontFamily: fontFamily ?? 'EslGothicUnicode_BzdV',
        fontWeight: weightList[weight],
        fontSize: size ?? 12,
        color: color ?? colors['DARK'],
        textAlign: align
    }

    if (left) styles['marginLeft'] = left
    if (right) styles['marginRight'] = right
    if (bottom) styles['marginBottom'] = bottom
    if (top) styles['marginTop'] = top
    if (vertical) styles['marginVertical'] = vertical
    if (horizontal) styles['marginHorizontal'] = horizontal

    if (isAnimated && isAnimated === true)
        return (<Animated.Text style={[styles, style]}>{children}</Animated.Text>)

    return (<Text style={[styles, style]}>{children}</Text>)
}

export default CustomText