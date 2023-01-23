import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const HomeHeader = () => {

    const navigation = useNavigation()

    const bagNavigationHandler = () => {
        navigation.navigate('Bag')
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.menuContainer}>
                    <FastImage source={{ uri: ICONS.ICON_MENU }} style={styles.menu} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.premium}>
                    <FastImage source={{ uri: ICONS.ICON_MYNTRA }} style={styles.logo} />
                    <View style={{ justifyContent: 'flex-start' }}>
                        <CustomText size={8}>Become</CustomText>
                        <CustomText size={8} color={COLORS.PRIMARY}>Insider</CustomText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity>
                    <FastImage source={{ uri: ICONS.ICON_SEARCH }} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FastImage source={{ uri: ICONS.ICON_BELL }} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FastImage source={{ uri: ICONS.ICON_HEART }} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={bagNavigationHandler}>
                    <FastImage source={{ uri: ICONS.ICON_BAG }} style={styles.icon} />
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
        backgroundColor: 'white',
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