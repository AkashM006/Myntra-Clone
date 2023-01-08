import { ScrollView } from 'react-native'
import React from 'react'
import HeaderSection from '../components/Profile/HeaderSection'
import OptionsSection from '../components/Profile/OptionsSection'
import AppVersion from '../components/Profile/AppVersion'
import Footer from '../components/Reusable/Footer'

const ProfileScreen = () => {
    return (
        <>
            <ScrollView>
                <HeaderSection />
                <OptionsSection />
                <AppVersion />
            </ScrollView>
            <Footer />
        </>
    )
}

export default ProfileScreen