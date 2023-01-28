import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/userSlice'

const AppVersion = () => {

    const user = useSelector(state => state.user)
    const isLoggedIn = user.token?.length !== 0
    const dispatch = useDispatch()

    const logoutHandler = () => { dispatch(logout()) }

    return (
        <View style={styles.container}>
            <CustomText color={COLORS.SHADEDARK} vertical={20}>
                FCM Token: {user.fcmToken}
            </CustomText>
            {isLoggedIn && <TouchableOpacity onPress={logoutHandler} style={[styles.button, { borderColor: COLORS.PRIMARY }]}>
                <CustomText color={COLORS.PRIMARY} weight='light' align='center'>
                    LOG OUT
                </CustomText>
            </TouchableOpacity>}
            <CustomText color={COLORS.SHADEDARK} align='center' top={25}>
                APP VERSION 4.2212.0
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { height: 250, padding: '3.5%' },
    button: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 4
    }
})

export default AppVersion