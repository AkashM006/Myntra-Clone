import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Badge from '../Reusable/Badge'

const Header = () => {

    const { colors } = useSelector(state => state.theme)

    const wishlistItems = useSelector(state => state.wishlist.items)
    const bagItems = useSelector(state => state.bag.items)

    const bagNavigationHandler = _ => { }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <CustomText weight='light' color={colors['SHADEDARK']}>
                Categories
            </CustomText>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginRight: 15 }}>
                    <FastImage
                        source={{ uri: ICONS.ICON_HEART }}
                        style={styles.icon}
                        tintColor={colors['DARK']}
                    />
                    <Badge top={-5} right={-10} count={wishlistItems.length} />
                </TouchableOpacity>
                <TouchableOpacity onPress={bagNavigationHandler}>
                    <FastImage
                        source={{ uri: ICONS.ICON_BAG }}
                        style={styles.icon}
                        tintColor={colors['DARK']}
                    />
                    <Badge top={-5} right={-10} count={bagItems.length} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        height: 25,
        width: 25
    }
})

export default Header