import { View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Contact/Header'
import Detail from '../components/Contact/ContactDetail/Detail'

const ContactDetailScreen = () => {

    const params = useRoute().params

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Detail id={params.id} title={params.title} />
        </View>
    )
}

export default ContactDetailScreen