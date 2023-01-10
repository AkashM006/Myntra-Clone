import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ProfileScreen from '../screens/ProfileScreen'
import Header from '../components/Reusable/Header'
import OtpScreen from '../screens/OtpScreen'
import RegistrationScreen from '../screens/RegistrationScreen'


const Stack = createNativeStackNavigator()

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='MainProfile'
                component={ProfileScreen}
                options={{ header: Header, }}
            />
            <Stack.Screen
                name='Otp'
                component={OtpScreen}
                options={{ header: () => { } }}
            />
            <Stack.Screen
                name='Registration'
                component={RegistrationScreen}
                options={{ header: () => { } }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack