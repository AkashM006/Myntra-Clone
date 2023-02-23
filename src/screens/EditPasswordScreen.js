import { View } from 'react-native'
import React from 'react'
import Header from '../components/Profile/Header'
import EditPasswordBody from '../components/Profile/EditPassword/EditPasswordBody'

const EditPasswordScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header title='Profile' />
            <EditPasswordBody />
        </View>
    )
}

export default EditPasswordScreen