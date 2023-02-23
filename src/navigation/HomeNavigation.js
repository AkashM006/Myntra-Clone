import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import Drawer from '../components/Home/DrawerHeader'
import CategoriesStack from './CategoriesStack'
import ContactScreen from '../screens/ContactScreen'
import ContactListScreen from '../screens/ContactListScreen'
import ContactDetailScreen from '../screens/ContactDetailScreen'

const DrawerNavigator = createDrawerNavigator()

const HomeNavigation = () => {
    const options = () => ({ header: () => { } })
    return (
        <DrawerNavigator.Navigator backBehavior='history' useLegacyImplementation={false} drawerContent={() => <Drawer />} initialRouteName='Home' screenOptions={{
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
                options={{
                    unmountOnBlur: true,
                    header: () => { }
                }}
            />
            <DrawerNavigator.Screen
                name='Categories'
                component={CategoriesStack}
                options={options}
            />
            <DrawerNavigator.Screen
                name='Contact'
                component={ContactScreen}
                options={{
                    header: () => { },
                    unmountOnBlur: true
                }}
            />
            <DrawerNavigator.Screen
                name='ContactList'
                component={ContactListScreen}
                options={{
                    header: () => { },
                    unmountOnBlur: true
                }}
            />
            <DrawerNavigator.Screen
                name='ContactDetail'
                component={ContactDetailScreen}
                options={{
                    header: () => { },
                    unmountOnBlur: true
                }}
            />
        </DrawerNavigator.Navigator>
    )
}

export default HomeNavigation