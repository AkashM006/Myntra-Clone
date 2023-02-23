import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../../Reusable/CustomText'
import COLORS from '../../../constants/Colors'

const RadioButton = ({ active, text, setActive }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={setActive}>
            <View style={[
                styles.outer,
                { borderColor: active === text ? COLORS.PRIMARY : COLORS.SHADEDARK }
            ]}>
                <View style={[{ backgroundColor: active === text ? COLORS.PRIMARY : COLORS.WHITE }, styles.inner]} />
            </View>
            <CustomText weight={text === active ? 'light' : null} color={COLORS.SHADEDARK} size={16}>{text}</CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    outer: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 1000,
        marginRight: 15,
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        height: 15,
        width: 15,
        borderRadius: 10
    },
    container: {
        flexDirection: 'row',
        marginBottom: 20
    }
})

export default RadioButton