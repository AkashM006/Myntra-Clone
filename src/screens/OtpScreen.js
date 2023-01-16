import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import OtpBody from '../components/Profile/OtpBody'
import Overlay from '../components/Reusable/Overlay'

const OtpScreen = () => {

    const phone = useRoute().params?.phone
    const navigation = useNavigation()

    const handleBack = () => {
        if (navigation.canGoBack) {
            navigation.goBack()
        }
    }

    const [submitted, setSubmitted] = useState(false)

    return (
        <View style={styles.container}>
            <Overlay render={submitted} />
            <TouchableOpacity onPress={handleBack}>
                <Image source={require('../icons/back.png')} />
            </TouchableOpacity>
            <OtpBody phone={phone} setSubmitted={setSubmitted} />
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

export default OtpScreen