import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Header from '../components/Home/Header'
import HomeScreen from '../screens/HomeScreen'

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    header: Header
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigation