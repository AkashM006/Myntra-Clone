import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'

const CustomButton = ({ text, onPressHandler, disabled, top, border, color, bgColor }) => {

    const style = {
        marginTop: top ?? 20,
        borderColor: border?.color ?? 'white',
        borderWidth: border?.width ?? 0,
        backgroundColor: disabled ? COLORS.SHADEDARK : bgColor ?? COLORS.PRIMARY
    }

    return (
        <TouchableOpacity style={[styles.button, , style]} onPress={onPressHandler} disabled={disabled}>
            <CustomText weight={'light'} color={color ?? 'white'}>
                {text}
            </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15
    },
})

export default CustomButton