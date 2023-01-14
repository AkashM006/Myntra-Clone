import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ProfileScreen from '../screens/ProfileScreen'
import Header from '../components/Reusable/Header'
import OtpScreen from '../screens/OtpScreen'
import RegistrationScreen from '../screens/RegistrationScreen'
import PasswordScreen from '../screens/PasswordScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'


const Stack = createNativeStackNavigator()

const ProfileStack = () => {

    const options = { header: () => { } }

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
                options={options}
            />
            <Stack.Screen
                name='Registration'
                component={RegistrationScreen}
                options={options}
            />
            <Stack.Screen
                name='Password'
                component={PasswordScreen}
                options={options}
            />
            <Stack.Screen
                name='Forgot'
                component={ForgotPasswordScreen}
                options={options}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack