import { ScrollView } from 'react-native'
import React from 'react'
import HeaderSection from '../components/Profile/HeaderSection'
import OptionsSection from '../components/Profile/OptionsSection'
import AppVersion from '../components/Profile/AppVersion'
import Footer from '../components/Reusable/Footer'
import Overlay from '../components/Profile/Overlay'

const ProfileScreen = () => {

    return (
        <>
            <Overlay />
            <ScrollView bounces={false} alwaysBounceHorizontal={false} showsVerticalScrollIndicator={false}>
                <HeaderSection />
                <OptionsSection />
                <AppVersion />
            </ScrollView>
            <Footer />
        </>
    )
}

export default ProfileScreen