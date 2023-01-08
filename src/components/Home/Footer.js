import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation, useNavigationState } from '@react-navigation/native'

const icons = [
    {
        id: 1,
        name: 'Home',
        active: require('../../icons/logo.png'),
        inactive: require('../../icons/logo-inactive.png'),
        redirectTo: 'Home',
        routes: ['Main', 'Home', 'List', 'Detail']
    },
    {
        id: 2,
        name: 'Categories',
        active: require('../../icons/categories.png'),
        inactive: require('../../icons/categories-inactive.png'),
        routes: ['Categories']
    },
    {
        id: 3,
        name: 'Studio',
        active: require('../../icons/studio.png'),
        inactive: require('../../icons/studio-inactive.png'),
        routes: ['Studio']
    },
    {
        id: 4,
        name: 'Explore',
        active: require('../../icons/explore.png'),
        inactive: require('../../icons/explore-inactive.png'),
        routes: ['Explore']
    },
    {
        id: 5,
        name: 'Profile',
        active: require('../../icons/profile.png'),
        inactive: require('../../icons/profile-inactive.png'),
        redirectTo: 'Profile',
        routes: ['Profile']
    }
]

const Footer = () => {

    const navigation = useNavigation()
    const activeRoute = useNavigationState(state => state.routes[state.index].name)

    const changeRoute = (name, link) => {
        if (link !== null) navigation.navigate(link, {
            title: name
        })
    }

    return (
        <View style={styles.container}>
            {icons.map(icon => {
                const style = [styles.image]
                if (icon.name !== 'Home') style.push({ tintColor: icon.routes.includes(activeRoute) ? '#FF69B4' : 'black' })
                return (
                    <TouchableOpacity onPress={() => changeRoute(icon.name, icon.redirectTo ?? null)} key={icon.id}>
                        <Image
                            source={icon.routes.includes(activeRoute) ? icon.active : icon.inactive}
                            style={style}
                        />
                        <CustomText style={[styles.text, { color: icon.name === activeRoute ? '#FF69B4' : 'black', }]}>{icon.name}</CustomText>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        backgroundColor: 'white',
        elevation: 20
    },
    image: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center',
        fontSize: 12,
    }
})

export default Footer