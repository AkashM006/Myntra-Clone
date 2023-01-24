import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'

const Avatar = ({ dimension, fontSize, active }) => {

    const user = useSelector(state => state.user)
    const { colors } = useSelector(state => state.theme)
    // const user = {
    //     fullName: 'Akash Murugesan',
    //     phone: '+91 9976607000'
    // }

    let style = {
        height: dimension,
        width: dimension,
        borderRadius: dimension / 2,
        backgroundColor: colors['DARK'],
        borderColor: colors['LIGHT']
    }

    return (
        <View style={[styles.profileContainer, { borderRadius: dimension * 100, borderWidth: active ? 1 : 0 }]}>
            <View style={[styles.profile, style]}>
                <CustomText align={'center'} size={fontSize} color={colors['LIGHT']}>
                    {user.fullName ? user.fullName.slice(0, 1).toUpperCase() : 'Y'}
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        justifyContent: 'center',
        borderWidth: 1
    },
    profileContainer: {
        borderColor: 'red',
        alignSelf: 'center',
        borderRadius: 300,
        padding: 1,
    }
})

export default Avatar