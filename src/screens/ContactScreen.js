import { ScrollView, View } from 'react-native'
import React from 'react'
import Header from '../components/Contact/Header'
import Body from '../components/Contact/Body'

const ContactScreen = () => {
    return (
        <View style={{ flex: 1, }}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
                <Body />
            </ScrollView>
        </View>
    )
}

export default ContactScreen