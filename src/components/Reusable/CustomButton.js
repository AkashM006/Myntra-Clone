import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomButton = ({ text, onPressHandler, disabled }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: disabled ? 'gray' : '#ff406c' }]} onPress={onPressHandler} disabled={disabled}>
            <CustomText weight={'light'} style={styles.buttonText}>
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
    buttonText: {
        color: 'white'
    },
})

export default CustomButton