import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import Drawer from '../components/Home/DrawerHeader'

const DrawerNavigator = createDrawerNavigator()

const HomeNavigation = () => {
    const options = () => ({ header: () => { } })
    return (
        <DrawerNavigator.Navigator useLegacyImplementation={false} drawerContent={() => <Drawer />} initialRouteName='Home' screenOptions={{
            swipeEnabled: false,
        }} >
            <DrawerNavigator.Screen
                name='Home'
                component={HomeStack}
                options={{
                    unmountOnBlur: true,
                    header: () => { }
                }}
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