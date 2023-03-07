import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './HomeStack'
import Drawer from '../components/Home/DrawerHeader'

const DrawerNavigator = createDrawerNavigator()

const HomeNavigation = () => {
    const options = () => ({ header: () => { } })
    return (
        <DrawerNavigator.Navigator
            backBehavior='history'
            useLegacyImplementation={false}
            drawerContent={() => <Drawer />}
            initialRouteName='Home'
            screenOptions={{
                swipeEnabled: false,
            }}
        >
            <DrawerNavigator.Screen
                name='Home'
                component={HomeStack}
                options={{
                    unmountOnBlur: true,
                    header: () => { }
                }}
            />
        </DrawerNavigator.Navigator>
    )
}

export default HomeNavigation