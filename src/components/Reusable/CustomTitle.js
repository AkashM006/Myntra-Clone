import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomTitle = ({ text }) => <CustomText weight={'light'} style={styles.text}>{text}</CustomText>


const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 24,
        marginBottom: 10
    },
})

export default CustomTitle