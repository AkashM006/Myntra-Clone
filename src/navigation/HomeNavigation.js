import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FilterScreen from '../screens/FilterScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'

// const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const HomeNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName='Home' screenOptions={{
            unmountOnBlur: true
        }} >
            {/* <Drawer.Screen
                name='Home'
                component={HomeScreen}
                options={{ header: HomeHeader, }}
            />
            <Drawer.Screen
                name='List'
                component={ListScreen}
                options={{ header: () => <ListHeader /> }}
            />
            <Drawer.Screen
                name='Detail'
                component={DetailScreen}
                options={{
                    header: () => { },
                    // animation: 'slide_from_bottom'

                }}
            /> */}
            <Drawer.Screen
                name='Home'
                component={HomeStack}
                options={() => ({ header: () => { }, })}
            />
            <Drawer.Screen
                name='Filter'
                component={FilterScreen}
                options={() => ({ header: () => { }, })}
            />
            {/* <Drawer.Screen
                name='Profile'
                component={ProfileScreen}
                options={() => ({
                    header: () => <Header />,
                })}
            /> */}
            <Drawer.Screen
                name='Profile'
                component={ProfileStack}
                options={() => ({ header: () => { }, })}
            />
        </Drawer.Navigator>
    )
}

export default HomeNavigation