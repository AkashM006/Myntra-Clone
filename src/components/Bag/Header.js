import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import ICONS from '../../icons/icons'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import Badge from '../Reusable/Badge'

const Header = () => {

    const navigation = useNavigation()
    const { colors } = useSelector(state => state.theme)
    const wishlistItems = useSelector(state => state.wishlist.items)

    const backHandler = () => { navigation.goBack() }
    const navigateToWishlist = () => {
        navigation.navigate('Wishlist')
    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={backHandler}>
                    <FastImage
                        tintColor={colors['DARK']}
                        source={{ uri: ICONS.ICON_BACK }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ height: 25, width: 25 }}
                    />
                </TouchableOpacity>
                <CustomText color={colors['DARK']} left={10} weight='light' size={16}>
                    SHOPPING BAG
                </CustomText>
            </View>
            <TouchableOpacity onPress={navigateToWishlist}>
                <FastImage
                    tintColor={colors['DARK']}
                    source={{ uri: ICONS.ICON_HEART }}
                    style={{ height: 25, width: 25 }}
                />
                <Badge top={-5} right={-10} count={wishlistItems.length} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3.5%'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Header