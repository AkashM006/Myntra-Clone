import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import COLORS from '../../constants/Colors'

const icons = [
    {
        id: 1,
        name: 'Home',
        active: require('../../icons/logo.png'),
        inactive: require('../../icons/logo-inactive.png'),
        redirectTo: 'Home',
        routes: ['MainHome', 'Home', 'List', 'Detail']
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
        routes: ['Profile', 'MainProfile']
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
                if (icon.name !== 'Home') style.push({ tintColor: icon.routes.includes(activeRoute) ? COLORS.PRIMARY : COLORS.BLACK })
                return (
                    <TouchableOpacity onPress={() => changeRoute(icon.name, icon.redirectTo ?? null)} key={icon.id}>
                        <Image
                            source={icon.routes.includes(activeRoute) ? icon.active : icon.inactive}
                            style={style}
                        />
                        <CustomText style={[styles.text, { color: icon.name === activeRoute ? COLORS.PRIMARY : COLORS.BLACK, }]}>{icon.name}</CustomText>
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
    }
})

export default Footer