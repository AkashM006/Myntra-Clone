import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../../constants/Colors'

const CustomLoader = () => {
    return (
        <View>
            <ActivityIndicator style={styles.loader} size={'small'} color={COLORS.PRIMARY} />
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        padding: '2%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 100
    }
})

export default CustomLoader