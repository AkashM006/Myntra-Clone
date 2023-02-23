import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import PasswordBody from '../components/Profile/PasswordBody'
import Overlay from '../components/Reusable/Overlay'
import FastImage from 'react-native-fast-image'
import ICONS from '../icons/icons'

const PasswordScreen = () => {

    const phone = useRoute().params?.phone
    const navigation = useNavigation()
    const [submitted, setSubmitted] = useState(false)

    const handleBack = () => {
        if (navigation.canGoBack) {
            navigation.dispatch(StackActions.popToTop())
        }
    }

    return (
        <View style={styles.container}>
            <Overlay render={submitted} />
            <TouchableOpacity onPress={handleBack}>
                <FastImage source={{ uri: ICONS.ICON_BACK }} />
            </TouchableOpacity>
            <PasswordBody submitted={submitted} setSubmitted={setSubmitted} phone={phone} />
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
})

export default PasswordScreen