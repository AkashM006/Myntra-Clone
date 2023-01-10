import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import OtpBody from '../components/Profile/OtpBody'

const OtpScreen = () => {

    const phone = useRoute().params?.phone
    const navigation = useNavigation()

    const handleBack = () => {
        if (navigation.canGoBack) {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack}>
                <Image source={require('../icons/back.png')} />
            </TouchableOpacity>
            <OtpBody phone={phone} />
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