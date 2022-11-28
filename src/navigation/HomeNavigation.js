import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeHeader from '../components/Home/HomeHeader'
import ListHeader from '../components/List/ListHeader'
import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import ListScreen from '../screens/ListScreen'

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ header: HomeHeader, }}
            />
            <Stack.Screen
                name='List'
                component={ListScreen}
                options={{ header: () => <ListHeader /> }}
            />
            <Stack.Screen
                name='Detail'
                component={DetailScreen}
                options={{ header: () => { } }}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigation