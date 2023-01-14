import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import PasswordBody from '../components/Profile/PasswordBody'
import Overlay from '../components/Reusable/Overlay'

const PasswordScreen = () => {

    const phone = useRoute().params?.phone
    const navigation = useNavigation()
    const [submitted, setSubmited] = useState(false)

    const handleBack = () => {
        if (navigation.canGoBack) {
            navigation.dispatch(StackActions.popToTop())
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Overlay render={submitted} />
            </View>
            <TouchableOpacity onPress={handleBack}>
                <Image source={require('../icons/back.png')} />
            </TouchableOpacity>
            <PasswordBody submitted={submitted} setSubmited={setSubmited} phone={phone} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    }
})

export default PasswordScreen