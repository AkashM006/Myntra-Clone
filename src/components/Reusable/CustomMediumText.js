import { StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomMediumText = ({ text }) => <CustomText style={styles.text}>{text}</CustomText>

const styles = StyleSheet.create({
    text: {
        color: '#717171',
        fontSize: 12
    }
})

export default CustomMediumText