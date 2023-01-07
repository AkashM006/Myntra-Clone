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
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './HomeStack'

// const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const HomeNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName='Home'>
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
                options={{
                    header: () => { }
                }}
            />
            <Drawer.Screen
                name='Filter'
                component={FilterScreen}
                options={() => ({
                    header: () => { },
                })}
            />
            <Drawer.Screen
                name='Profile'
                component={ProfileScreen}
                options={() => ({
                    header: () => <Header />,
                })}
            />
        </Drawer.Navigator>
    )
}

export default HomeNavigation