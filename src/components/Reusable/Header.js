import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import CustomText from './CustomText'

const Header = () => {
    const title = useRoute().params?.title

    return (
        <View style={styles.container}>
            <CustomText weight={'bolder'} style={styles.text}>{title}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        elevation: 3,
        backgroundColor: 'white',
        paddingHorizontal: '3.5%',
        justifyContent: 'center',
    },
    text: {
        color: 'gray'
    }
})

export default Header