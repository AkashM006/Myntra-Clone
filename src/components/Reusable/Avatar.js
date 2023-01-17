import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'

const Avatar = ({ dimension, fontSize, active }) => {

    const user = useSelector(state => state.user)
    const isLoggedIn = user.token?.length !== 0
    // const user = {
    //     fullName: 'Akash Murugesan',
    //     phone: '+91 9976607000'
    // }

    let style = {
        height: dimension,
        width: dimension,
        borderRadius: dimension / 2
    }

    return (
        <View style={[styles.profileContainer, { borderRadius: dimension * 100, borderWidth: active ? 1 : 0 }]}>
            <View style={[styles.profile, style]}>
                <CustomText align={'center'} size={fontSize} color={COLORS.WHITE}>
                    {user.fullName ? user.fullName.slice(0, 1).toUpperCase() : 'Y'}
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        backgroundColor: 'black',
        justifyContent: 'center',
        borderColor: 'white',
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