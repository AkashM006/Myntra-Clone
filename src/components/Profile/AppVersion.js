import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const AppVersion = () => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text}>
                APP VERSION 4.2212.0
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 175,
    },
    text: {
        textAlign: 'center',
        marginTop: 25,
        color: '#727272',
        fontSize: 12
    }
})

export default AppVersion