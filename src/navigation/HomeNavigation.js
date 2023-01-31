import React from 'react'
import FilterScreen from '../screens/FilterScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import Drawer from '../components/Home/DrawerHeader'

const DrawerNavigator = createDrawerNavigator()

const HomeNavigation = () => {
    const options = () => ({ header: () => { } })
    return (
        <DrawerNavigator.Navigator useLegacyImplementation={false} drawerContent={() => <Drawer />} initialRouteName='Home' screenOptions={{
            unmountOnBlur: true,
            swipeEnabled: false,
        }} >
            <DrawerNavigator.Screen
                name='Home'
                component={HomeStack}
                options={options}
            />
            <DrawerNavigator.Screen
                name='Filter'
                component={FilterScreen}
                options={options}
            />
            <DrawerNavigator.Screen
                name='Profile'
                component={ProfileStack}
                options={options}
            />
        </DrawerNavigator.Navigator>
    )
}

export default HomeNavigation