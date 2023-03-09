import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginPopUpStatus } from '../../redux/uiSlice'
import Badge from '../Reusable/Badge'
import DeferredActionContext from '../../context/deferredActionContext'

const HomeHeader = () => {

    const navigation = useNavigation()
    const { colors } = useSelector(state => state.theme)
    const token = useSelector(state => state.user.token)
    const bagItems = useSelector(state => state.bag.items)
    const wishlistItems = useSelector(state => state.wishlist.items)
    const notificationData = useSelector(state => state.notification.data)
    const {state, contextDispatch} = useContext(DeferredActionContext)

    const total = notificationData.reduce((total, item) => item.read ? total : total + 1, 0)

    const dispatch = useDispatch()

    const navigateToBag = _ => { navigation.navigate('Bag') }
    const navigateToWishlist = _ => navigation.navigate('Wishlist')

    const bagNavigationHandler = _ => {
        if (token.length !== 0)navigateToBag()
        else {
            contextDispatch({
                type: 'add',
                callback: navigateToBag
            })
            dispatch(setLoginPopUpStatus(true))
        }
    }

    const menuNavigationHandler = _ => navigation.openDrawer()

    const notificationsNavigationHandler = _ => navigation.navigate('Notification')

    const wishlistNavigationHandler = _ => {
        if (token.length !== 0)navigateToWishlist()
        else {
            contextDispatch({
                type: 'add',
                callback: navigateToWishlist
            })
            dispatch(setLoginPopUpStatus(true))
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={menuNavigationHandler} style={styles.menuContainer}>
                    <FastImage tintColor={colors['DARK']} source={{ uri: ICONS.ICON_MENU }} style={styles.menu} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.premium}>
                    <FastImage resizeMode='contain' source={{ uri: ICONS.ICON_LOGO }} style={[styles.logo, { backgroundColor: colors['LIGHT'] }]} />
                    <View style={{ justifyContent: 'flex-start' }}>
                        <CustomText size={8}>Become</CustomText>
                        <CustomText size={8} color={COLORS.PRIMARY}>Insider</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity>
                    <FastImage tintColor={colors['DARK']} source={{ uri: ICONS.ICON_SEARCH }} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={notificationsNavigationHandler}>
                    <FastImage tintColor={colors['DARK']} source={{ uri: ICONS.ICON_BELL }} style={[styles.icon, { marginRight: 17.5 }]} />
                    <Badge top={-5} right={10} count={total} />
                </TouchableOpacity>
                <TouchableOpacity onPress={wishlistNavigationHandler}>
                    <FastImage tintColor={colors['DARK']} source={{ uri: ICONS.ICON_HEART }} style={[styles.icon, { marginRight: 17.5 }]} />
                    <Badge top={-5} right={5} count={wishlistItems.length} />
                </TouchableOpacity>
                <TouchableOpacity onPress={bagNavigationHandler}>
                    <FastImage tintColor={colors['DARK']} source={{ uri: ICONS.ICON_BAG }} style={styles.icon} />
                    <Badge top={-5} right={0} count={bagItems.length} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: 'black',
        elevation: 3
    },
    menu: {
        height: 15,
        width: 15,
    },
    logo: {
        height: 30,
        width: 30,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    premium: {
        flexDirection: 'row'
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuContainer: { marginRight: 15, },
})

export default HomeHeader