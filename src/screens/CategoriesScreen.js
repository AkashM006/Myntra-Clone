import { View } from 'react-native'
import React from 'react'
import Header from '../components/Categories/Header'
import Footer from '../components/Reusable/Footer'
import Body from '../components/Categories/Body'

const CategoriesScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Body />
            <Footer />
        </View>
    )
}

export default CategoriesScreen