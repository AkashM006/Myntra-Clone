import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeHeader from '../components/Home/HomeHeader'
import ListHeader from '../components/List/ListHeader'
import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import ListScreen from '../screens/ListScreen'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='MainHome'
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
        </Stack.Navigator>
    )
}

export default HomeStack