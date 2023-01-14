import { StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomHighlightedText = ({ text }) => <CustomText weight={'light'} style={styles.text}>{text}</CustomText>

const styles = StyleSheet.create({
    text: {
        color: '#ff406c',
        fontSize: 12,
    }
})

export default CustomHighlightedText