import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useEffect } from 'react'
import Header from '../components/Reusable/Header'
import AddressScreen from '../screens/AddressScreen'
import BagScreen from '../screens/BagScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import ContactDetailScreen from '../screens/ContactDetailScreen'
import ContactListScreen from '../screens/ContactListScreen'
import ContactScreen from '../screens/ContactScreen'
import CouponsScreen from '../screens/CouponsScreen'
import DetailScreen from '../screens/DetailScreen'
import EditAccountScreen from '../screens/EditAccountScreen'
import EditMobileScreen from '../screens/EditMobileScreen'
import EditPasswordScreen from '../screens/EditPasswordScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import ListScreen from '../screens/ListScreen'
import NotificationScreen from '../screens/NotificationScreen'
import OtpScreen from '../screens/OtpScreen'
import PasswordScreen from '../screens/PasswordScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RegistrationScreen from '../screens/RegistrationScreen'
import WishListScreen from '../screens/WishListScreen'
import HomeNavigation from './HomeNavigation'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { useNavigation } from '@react-navigation/native'
import { handleLinking } from '../utils/sharing'
import { showToast } from '../utils/utils'

// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

const MainStack = () => {

    const navigation = useNavigation()

    useEffect(() => { // for handling linking in foreground
        const unsubscribe = dynamicLinks().onLink((link) => {
            if (link) handleLinking(link, navigation)
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (link) handleLinking(link, navigation)
            })
            .catch(err => {
                console.log("Error when trying to get the link in background: ", err)
                showToast('Something went wrong when dynamic link was opened in background')
            })
    }, [navigation])

    const options = { header: () => { } }
    return (
        <Stack.Navigator initialRouteName='MainHome' screenOptions={{
            freezeOnBlur: true
        }}>
            <Stack.Screen
                name='MainHome'
                component={HomeNavigation}
                options={options}
            />
            <Stack.Screen
                name='List'
                component={ListScreen}
                options={{
                    header: () => <></>,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name='Detail'
                component={DetailScreen}
                options={{
                    header: () => { },
                    animation: 'slide_from_bottom'

                }}
            />
            <Stack.Screen
                name='Bag'
                component={BagScreen}
                options={options}
            />
            <Stack.Screen
                name='Wishlist'
                component={WishListScreen}
                options={options}
            />
            <Stack.Screen
                name='Notification'
                component={NotificationScreen}
                options={options}
            />
            <Stack.Screen
                name='Profile'
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
            <Stack.Screen
                name='Address'
                component={AddressScreen}
                options={options}
            />
            <Stack.Screen
                name='Coupons'
                component={CouponsScreen}
                options={options}
            />
            <Stack.Screen
                name='CategoriesHome'
                component={CategoriesScreen}
                options={options}
            />
            <Stack.Screen
                name='Contact'
                component={ContactScreen}
                options={{
                    header: () => { },
                    unmountOnBlur: true
                }}
            />
            <Stack.Screen
                name='ContactList'
                component={ContactListScreen}
                options={{
                    header: () => { },
                    unmountOnBlur: true
                }}
            />
            <Stack.Screen
                name='ContactDetail'
                component={ContactDetailScreen}
                options={{
                    header: () => { },
                    unmountOnBlur: true
                }}
            />
        </Stack.Navigator>
    )
}

export default MainStack