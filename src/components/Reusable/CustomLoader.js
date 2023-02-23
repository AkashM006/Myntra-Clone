import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'

const CustomLoader = () => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View>
            <ActivityIndicator style={[styles.loader, { backgroundColor: colors['LIGHT'] }]} size={'small'} color={COLORS.PRIMARY} />
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        padding: '2%',
        alignSelf: 'center',
        borderRadius: 100
    }
})

export default CustomLoader