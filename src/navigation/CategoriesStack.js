import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CategoriesScreen from '../screens/CategoriesScreen'

const StackNavigator = createStackNavigator()

const CategoriesStack = () => {
    const options = { header: () => { } }

    return (
        <StackNavigator.Navigator initialRouteName='CategoriesHome' detachInactiveScreens screenOptions={{
            freezeOnBlur: true
        }}>
            <StackNavigator.Screen
                name='CategoriesHome'
                component={CategoriesScreen}
                options={options}
            />
        </StackNavigator.Navigator>
    )

}

export default CategoriesStack