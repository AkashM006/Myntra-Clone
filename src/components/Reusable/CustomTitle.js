import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomTitle = ({ text }) => <CustomText size={24} weight={'light'} style={styles.text}>{text}</CustomText>


const styles = StyleSheet.create({
    text: {
        marginBottom: 10
    },
})

export default CustomTitle