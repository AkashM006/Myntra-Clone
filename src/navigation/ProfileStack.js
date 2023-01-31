import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import ProfileScreen from '../screens/ProfileScreen'
import Header from '../components/Reusable/Header'
import OtpScreen from '../screens/OtpScreen'
import RegistrationScreen from '../screens/RegistrationScreen'
import PasswordScreen from '../screens/PasswordScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import EditAccountScreen from '../screens/EditAccountScreen'
import EditPasswordScreen from '../screens/EditPasswordScreen'
import EditMobileScreen from '../screens/EditMobileScreen'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setLoginPopUpStatus } from '../redux/uiSlice'

const Stack = createNativeStackNavigator()

const ProfileStack = () => {

    const options = { header: () => { } }

    const params = useRoute().params

    const open = params && params?.openLogin ? params.openLogin : false

    const dispatch = useDispatch()

    useEffect(() => {
        if (open) dispatch(setLoginPopUpStatus(open))
    }, [])

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='MainProfile'
                component={ProfileScreen}
                options={{ header: () => <Header heading='Profile' />, }}
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
            <Stack.Screen
                name='EditProfile'
                component={EditAccountScreen}
                options={options}
            />
            <Stack.Screen
                name='EditPassword'
                component={EditPasswordScreen}
                options={options}
            />
            <Stack.Screen
                name='EditMobile'
                component={EditMobileScreen}
                options={options}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack