import { View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Profile/Header'
import EditMobile from '../components/Profile/EditMobile/EditMobile'

const EditMobileScreen = () => {
    const navigation = useNavigation()

    const backPressHandler = () => {
        if (navigation.canGoBack) navigation.goBack()
    }
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <EditMobile />
        </View>
    )
}

export default EditMobileScreen