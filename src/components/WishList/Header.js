import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import CustomText from '../../components/Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import { clearSelected, setIsEditing } from '../../redux/wishlistSlice'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from '../../utils/utils'
import { closeLoading, setLoading } from '../../redux/uiSlice'
import Badge from '../Reusable/Badge'

const Header = () => {

    const { colors } = useSelector(state => state.theme)
    const { items, isEditing, selected } = useSelector(state => state.wishlist)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const bagItems = useSelector(state => state.bag.items)

    const backHandler = () => navigation.goBack()

    const editHandler = async () => {
        if (!isEditing) dispatch(setIsEditing(true))
        else {
            dispatch(setLoading({
                loading: true
            }))
            try {
                const result = await axios.delete(`${Config.API_KEY}/wishlist`, {
                    data: {
                        jwt: token,
                        productIds: selected.filter(id => id !== -1)
                    }
                })
                const data = result.data
                if (!data.status) showToast(data.message)
                else dispatch(clearSelected())
            } catch (error) {
                console.log("Error in Wishlist/Header.js while deleting items from wishlist: ", error)
                showToast('Something went wrong while removing items from wishlist. Please try again later')
            }
            dispatch(closeLoading())
            dispatch(setIsEditing(false))
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={backHandler}>
                    <FastImage
                        tintColor={colors['DARK']}
                        source={{ uri: ICONS.ICON_BACK }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View>
                    <CustomText color={colors['DARK']} left={10} weight='light' size={16}>
                        WISHLIST
                    </CustomText>
                    <CustomText left={10} color={colors['SHADEDARK']}>
                        {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </CustomText>
                </View>
            </View>
            {items.length > 0 && <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={editHandler}>
                    <FastImage
                        source={{ uri: isEditing ? ICONS.ICON_DELETE : ICONS.ICON_EDIT }}
                        style={[styles.icon, styles.right]}
                        tintColor={isEditing && selected.length === 1 ? colors['SHADELIGHT'] : colors['DARK']}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Bag')}>
                    <FastImage
                        source={{ uri: isEditing ? ICONS.ICON_SHARE : ICONS.ICON_BAG }}
                        style={[styles.icon, styles.right]}
                        tintColor={isEditing && selected.length === 1 ? colors['SHADELIGHT'] : colors['DARK']}
                    />
                    {!isEditing && <Badge top={-5} right={5} count={bagItems.length} />}
                </TouchableOpacity>
            </View>}
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
    },
    icon: { height: 25, width: 25 },
    right: { marginRight: 15 }
})

export default Header