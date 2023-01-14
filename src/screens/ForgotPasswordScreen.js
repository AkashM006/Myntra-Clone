import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import ForgotPasswordBody from '../components/Profile/ForgotPasswordBody'

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
                <Image source={require('../icons/back.png')} />
            </TouchableOpacity>
            <ForgotPasswordBody submitted={submitted} setSubmitted={setSubmitted} />
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