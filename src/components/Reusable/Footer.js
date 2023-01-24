import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'
import Avatar from './Avatar'
import ICONS from '../../icons/icons'

const icons = [
    {
        id: 1,
        name: 'Home',
        active: { uri: ICONS.ICON_LOGO },
        inactive: { uri: ICONS.ICON_LOGO_INACTIVE },
        redirectTo: 'Home',
        routes: ['MainHome', 'Home', 'List', 'Detail']
    },
    {
        id: 2,
        name: 'Categories',
        active: { uri: ICONS.ICON_CATEGORIES },
        inactive: { uri: ICONS.ICON_CATEGORIES_INACTIVE },
        routes: ['Categories']
    },
    {
        id: 3,
        name: 'Studio',
        active: { uri: ICONS.ICON_STUDIO },
        inactive: { uri: ICONS.ICON_STUDIO_INACTIVE },
        routes: ['Studio']
    },
    {
        id: 4,
        name: 'Explore',
        active: { uri: ICONS.ICON_EXPLORE },
        inactive: { uri: ICONS.ICON_EXPLORE_INACTIVE },
        routes: ['Explore']
    },
    {
        id: 5,
        name: 'Profile',
        active: { uri: ICONS.ICON_PROFILE },
        inactive: { uri: ICONS.ICON_PROFILE_INACTIVE },
        redirectTo: 'Profile',
        routes: ['Profile', 'MainProfile']
    }
]

const Footer = () => {

    const navigation = useNavigation()
    const activeRoute = useNavigationState(state => state.routes[state.index].name)

    const user = useSelector(state => state.user)
    const isLoggedIn = user.token?.length !== 0

    const changeRoute = (name, link) => {
        if (link !== null) navigation.navigate(link, {
            title: name
        })
    }

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            {icons.map(icon => {
                const isActive = icon.routes.includes(activeRoute)
                const style = [styles.image, { backgroundColor: colors['LIGHT'] }]
                if (icon.name !== 'Home') style.push({ tintColor: isActive ? colors['PRIMARY'] : colors['DARK'] })
                if (icon.name === 'Profile' && isLoggedIn) {
                    return <TouchableOpacity onPress={() => changeRoute(icon.name, icon.redirectTo ?? null)} key={icon.id}>
                        <Avatar dimension={30} fontSize={12} active={isActive} />
                        <CustomText size={10} color={isActive ? COLORS.PRIMARY : COLORS.BLACK} align='center'>
                            {user.fullName.length === 0 ? 'You' : user.fullName}
                        </CustomText>
                    </TouchableOpacity>
                }
                return (
                    <TouchableOpacity onPress={() => changeRoute(icon.name, icon.redirectTo ?? null)} key={icon.id}>
                        <Image
                            source={isActive ? icon.active : icon.inactive}
                            style={[style]}
                        />
                        <CustomText color={isActive ? colors['PRIMARY'] : colors['DARK']} weight={isActive ? 'light' : ''} style={[styles.text]}>
                            {icon.name}
                        </CustomText>
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
        resizeMode: 'contain',
    },
    text: {
        textAlign: 'center',
    }
})

export default Footer