import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'

const CustomButton = ({ text, onPressHandler, disabled }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: disabled ? COLORS.SHADEDARK : COLORS.PRIMARY }]} onPress={onPressHandler} disabled={disabled}>
            <CustomText weight={'light'} color={COLORS.WHITE}>
                {text}
            </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15
    },
})

export default CustomButton