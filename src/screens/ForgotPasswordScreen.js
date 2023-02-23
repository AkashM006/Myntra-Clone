import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import ForgotPasswordBody from '../components/Profile/ForgotPasswordBody'
import Overlay from '../components/Reusable/Overlay'
import FastImage from 'react-native-fast-image'
import ICONS from '../icons/icons'

const ForgotPasswordScreen = () => {

    const navigation = useNavigation()

    const handleBack = () => {
        if (navigation.canGoBack) {
            navigation.dispatch(StackActions.popToTop())
        }
    }

    const [submitted, setSubmitted] = useState(false)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack}>
                <FastImage source={{ uri: ICONS.ICON_BACK }} />
            </TouchableOpacity>
            <ForgotPasswordBody submitted={submitted} setSubmitted={setSubmitted} />
            <Overlay render={submitted} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        flex: 1
    }
})

export default ForgotPasswordScreen