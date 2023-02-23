import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import OtpBody from '../components/Profile/OtpBody'
import Overlay from '../components/Reusable/Overlay'
import FastImage from 'react-native-fast-image'
import ICONS from '../icons/icons'

const OtpScreen = () => {

    const { phone, isVerify, type, newUser } = useRoute().params
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
                <FastImage source={{ uri: ICONS.ICON_BACK }} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <OtpBody newUser={newUser} type={type} isVerify={isVerify} phone={phone} setSubmitted={setSubmitted} />
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