import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'

const AppVersion = () => {
    return (
        <View style={styles.container}>
            <CustomText color={COLORS.SHADEDARK} style={styles.text}>
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
    }
})

export default AppVersion