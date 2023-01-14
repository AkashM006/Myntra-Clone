import { ScrollView } from 'react-native'
import React from 'react'
import HeaderSection from '../components/Profile/HeaderSection'
import OptionsSection from '../components/Profile/OptionsSection'
import AppVersion from '../components/Profile/AppVersion'
import Footer from '../components/Reusable/Footer'
import LoginPop from '../components/Profile/LoginPop'
import Overlay from '../components/Profile/Overlay'

const ProfileScreen = () => {
    return (
        <>
            <Overlay />
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderSection />
                <OptionsSection />
                <AppVersion />
            </ScrollView>
            <LoginPop />
            <Footer />
        </>
    )
}

export default ProfileScreen