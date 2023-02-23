import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'

const Gender = ({ gender, setGender }) => {

    const borderColor = {
        true: '#ff406c',
        false: '#e1e1e1'
    }

    const color = {
        true: '#ff406c',
        false: '#b3b3b3'
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setGender('Female')} style={[styles.button, { borderColor: borderColor[gender === 'Female'] }]}>
                <CustomText
                    color={gender === 'Female' ? COLORS.PRIMARY : COLORS.SHADELIGHT}
                    weight={gender === 'Female' && 'light'}
                    style={styles.text}
                >
                    Female
                </CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('Male')} style={[styles.button, { borderColor: borderColor[gender === 'Male'] }]}>
                <CustomText
                    color={gender === 'Male' ? COLORS.PRIMARY : COLORS.SHADELIGHT}
                    weight={gender === 'Male' && 'light'}
                    style={styles.text}
                >
                    Male
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderColor: '#e1e1e1',
        borderWidth: 1,
        paddingVertical: 10,
        width: '49%',
        borderRadius: 2
    },
    text: {
        textAlign: 'center'
    }
})

export default Gender