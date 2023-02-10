import { View } from 'react-native'
import React from 'react'
import Header from '../components/Contact/Header'
import { useRoute } from '@react-navigation/native'
import List from '../components/Contact/ContactList/List'

const ContactListScreen = () => {

    const params = useRoute().params?.item

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <List item={params} />
        </View>
    )
}

export default ContactListScreen