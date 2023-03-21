import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'

const CustomButton = ({ text, onPressHandler, disabled, top, border, color, bgColor, paddingVertical, padding }) => {

    const style = {
        marginTop: top ?? 20,
        borderColor: border?.color ?? 'white',
        borderWidth: border?.width ?? 0,
        backgroundColor: disabled ? COLORS.SHADEDARK : bgColor ?? COLORS.PRIMARY,
        padding: padding ?? 20,
        paddingVertical: paddingVertical ?? 15
    }

    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPressHandler} disabled={disabled}>
            <CustomText weight={'light'} color={color ?? 'white'}>
                {text}
            </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 3,
        justifyContent: 'center',
    },
})

export default CustomButton