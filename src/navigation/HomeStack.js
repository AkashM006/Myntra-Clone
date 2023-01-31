import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeHeader from '../components/Home/HomeHeader'
import BagScreen from '../screens/BagScreen'
import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import ListScreen from '../screens/ListScreen'
import WishListScreen from '../screens/WishListScreen'

// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

const HomeStack = () => {
    const options = { header: () => { } }
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
        </Stack.Navigator>
    )
}

export default HomeStack