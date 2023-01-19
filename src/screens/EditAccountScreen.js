import { View } from 'react-native'
import React from 'react'
import Header from '../components/Profile/Header'
import EditBody from '../components/Profile/Edit/EditBody'

const EditAccountScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header title='Manage Your Account' />
            <EditBody />
        </View>
    )
}

export default EditAccountScreen