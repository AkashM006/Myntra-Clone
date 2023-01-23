import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomText from '../../components/Reusable/CustomText'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ICONS from '../../icons/icons'
import FastImage from 'react-native-fast-image'

const FIRSTLIST = [
    {
        id: 1,
        title: 'Orders',
        subtitle: 'Check your order status',
        icon: { uri: ICONS.ICON_ORDERS },
        always: true,
    },
    {
        id: 2,
        title: 'Help Center',
        subtitle: 'Help regarding your recent purchases',
        icon: { uri: ICONS.ICON_CUSTOMER_CARE },
        always: true
    },
    {
        id: 3,
        title: 'Myntra insider',
        subtitle: 'Copuons, offers & rewards await you',
        always: false,
        shouldBeLoggedIn: true,
        icon: { uri: ICONS.ICON_CROWN_OUTLINE }
    },
    {
        id: 4,
        title: 'Wishlist',
        subtitle: 'Your most loved styles',
        icon: { uri: ICONS.ICON_HEART },
        always: true
    }
]

const SECONDLIST = [
    {
        id: 1,
        title: 'Scan for coupon',
        icon: { uri: ICONS.ICON_QR_CODE },
    }
]

const THIRDLIST = [
    {
        id: 1,
        title: 'Manage Your Account',
        subtitle: 'Password, Email ID and Phone number',
        icon: { uri: ICONS.ICON_EDIT },
        to: 'EditProfile'
    },
    {
        id: 2,
        title: 'Settings',
        subtitle: 'Manage notifications & app settings',
        icon: { uri: ICONS.ICON_SETTINGS }
    }
]

const FOURTHLIST = [
    {
        id: 1,
        title: 'FAQs',
    },
    {
        id: 2,
        title: 'ABOUT US',
    },
    {
        id: 3,
        title: 'TERMS OF USE',
    },
    {
        id: 4,
        title: 'PRIVACY POLICY',
    }
]


const Card = ({ item, index, length, separator, moreicon, titleStyle }) => {

    let hasSeparator = separator ?? true
    let hasMoreIcon = moreicon ?? true

    const navigation = useNavigation()

    const pressHandler = () => {
        if (item.to) navigation.navigate(item.to)
    }

    return <TouchableOpacity
        onPress={pressHandler}
        style={[
            styles.button,
            {
                borderBottomWidth: index !== length - 1 && hasSeparator ? 1 : 0,
                paddingBottom: index !== length - 1 ? 15 : 5,
                paddingTop: index === 0 ? 5 : 15
            }
        ]}>
        <View style={styles.left}>
            {
                item.icon ?
                    <Image style={styles.icon} source={item.icon} /> :
                    <View style={styles.icon} />
            }
            <View>
                <CustomText weight={'bolder'} color={COLORS.SHADEDARK} style={[styles.title, titleStyle]}>{item.title}</CustomText>
                {item.subtitle && <CustomText size={10} color={COLORS.SHADELIGHT} style={styles.subtitle}>{item.subtitle}</CustomText>}
            </View>
        </View>
        {hasMoreIcon && <View>
            <FastImage source={{ uri: ICONS.ICON_RIGHT }} style={styles.right} />
        </View>}
    </TouchableOpacity>
}

const OptionsSection = () => {

    const user = useSelector(state => state.user)
    const isLoggedIn = user.token?.length !== 0

    const titleStyle = {
        fontWeight: '700'
    }

    return (
        <>
            <View style={styles.optionsListContainer}>
                {FIRSTLIST.map((item, index) => {
                    if (item.always || isLoggedIn === item.shouldBeLoggedIn)
                        return <Card key={item.id} item={item} index={index} length={FIRSTLIST.length} />
                }
                )}
            </View>
            <View style={styles.optionsListContainer}>
                {SECONDLIST.map((item, index) => <Card key={item.id} item={item} index={index} length={SECONDLIST.length} />)}
            </View>
            {isLoggedIn && <View style={styles.optionsListContainer}>
                {THIRDLIST.map((item, index) => <Card titleStyle={titleStyle} key={item.id} item={item} index={index} length={THIRDLIST.length} separator={false} moreicon={false} />)}
            </View>}
            <View style={styles.optionsListContainer}>
                {FOURTHLIST.map((item, index) => <Card titleStyle={titleStyle} key={item.id} item={item} index={index} length={THIRDLIST.length} separator={false} moreicon={false} />)}
            </View>
        </ >
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#f1f1f1',
        paddingVertical: 13,
        paddingHorizontal: '3.5%',
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 20,
        tintColor: '#71727c'
    },
    right: {
        height: 7,
        width: 7,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginBottom: 3
    },
    optionsListContainer: {
        marginVertical: 10,
        backgroundColor: 'white',
        paddingVertical: '3%',
    }
})

export default OptionsSection