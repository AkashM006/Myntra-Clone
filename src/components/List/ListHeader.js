import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation, useRoute } from '@react-navigation/native'
import Skeleton from '../Reusable/Skeleton'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Badge from '../Reusable/Badge'
import { useSelector } from 'react-redux'

const ListHeader = ({ itemCount }) => {

    const navigation = useNavigation()
    let title = useRoute().params.title?.toUpperCase()
    title = title.length > 20 ? title.substring(0, 18) + '...' : title
    const wishlistItems = useSelector(state => state.wishlist.items)
    const bagItems = useSelector(state => state.bag.items)

    const pressHandler = () => navigation.goBack()

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.backContainer} onPress={pressHandler}>
                    <FastImage source={{ uri: ICONS.ICON_BACK }} style={styles.back} />
                </TouchableOpacity>
                <View style={styles.left}>
                    <CustomText weight={'light'}>
                        {title}
                    </CustomText>
                    {itemCount === null ? <Skeleton height={15} width={70} borderRadius={4} /> : <CustomText>
                        {itemCount} Items
                    </CustomText>}
                </View>
            </View>
            <View style={styles.rightContainer}>
                <FastImage source={{ uri: ICONS.ICON_SEARCH }} style={styles.icon} />
                <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
                    <FastImage source={{ uri: ICONS.ICON_HEART }} style={styles.icon} />
                    <Badge top={-5} right={10} count={wishlistItems.length} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navgiate('Bag')}>
                    <FastImage source={{ uri: ICONS.ICON_BAG }} style={[styles.icon, { marginRight: 10 }]} />
                    <Badge top={-5} right={0} count={bagItems.length} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 60,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3.5%',
        justifyContent: 'space-between',
    },
    back: { height: 20, width: 20, },
    backContainer: { marginRight: 15 },
    left: { flexDirection: 'column' },
    icon: {
        height: 25,
        width: 25,
        marginRight: 20,
    },
    rightContainer: { flexDirection: 'row', },
    leftContainer: { flexDirection: 'row', alignItems: 'center', }
})

export default ListHeader