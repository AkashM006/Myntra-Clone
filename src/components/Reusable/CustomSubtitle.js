import { StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomSubtitle = ({ text }) => <CustomText style={styles.text}>{text}</CustomText>

const styles = StyleSheet.create({
    text: {
        color: '#bfbfbf',
        marginBottom: 20
    },
})

export default CustomSubtitle