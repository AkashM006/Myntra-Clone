import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeHeader from '../components/Home/HomeHeader'
import ListHeader from '../components/List/ListHeader'
import Header from '../components/Reusable/Header'
import DetailScreen from '../screens/DetailScreen'
import FilterScreen from '../screens/FilterScreen'
import HomeScreen from '../screens/HomeScreen'
import ListScreen from '../screens/ListScreen'
import ProfileScreen from '../screens/ProfileScreen'

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
                options={{
                    header: () => { },
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name='Filter'
                component={FilterScreen}
                options={() => ({
                    header: () => { },
                })}
            />
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={() => ({
                    header: () => <Header />,
                })}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigation