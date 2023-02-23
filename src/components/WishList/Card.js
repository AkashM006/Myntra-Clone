import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import { formatCurrency, showToast } from '../../utils/utils'
import Rating from '../List/Rating'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { addSelected, removeFromWishlist, removeSelected } from '../../redux/wishlistSlice'
import axios from 'axios'
import { closeLoading, setLoading } from '../../redux/uiSlice'
import Config from 'react-native-config'

const Card = ({ item, index, setSelected, disabled }) => {
    const { colors } = useSelector(state => state.theme)
    const { selected, isEditing } = useSelector(state => state.wishlist)
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const removeHandler = useCallback(async () => {
        dispatch(setLoading({
            loading: true,
        }))

        try {
            const result = await axios.delete(`${Config.API_KEY}/wishlist`, {
                data: {
                    productIds: [item.clothId],
                    jwt: token
                }
            })
            const data = result.data
            if (!data.status) showToast(data.message)
            else dispatch(removeFromWishlist(item.clothId))
        } catch (error) {
            console.log("Error in Wishlist/Card.js while deleting: ", error)
            showToast("Something went wrong while removing item from wishlist. Please try again later")
        }
        dispatch(closeLoading())
    }, [])

    const addHandler = useCallback(() => {
        if (selected.includes(item.clothId)) dispatch(removeSelected(item.clothId))
        else dispatch(addSelected(item.clothId))
    }, [selected])

    const containerStyle = useMemo(() => ({
        borderColor: selected.includes(item.clothId) ? colors['PRIMARY'] : colors['SHADELIGHT'],
        marginLeft: index % 2 === 0 ? '2.5%' : '1%',
        marginRight: index % 2 === 1 ? '2.5%' : '1%',
    }), [selected])

    const moveToBagHandler = () => { setSelected(item) }

    return (
        <TouchableOpacity onPress={addHandler} disabled={!isEditing || disabled} style={[
            styles.container,
            containerStyle
        ]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                {item.ratings && item.star && <Rating align='left' count={item.ratings} rating={item.star} />}
                <Pressable disabled={isEditing || disabled} onPress={removeHandler} style={[styles.iconContainer, {
                    borderColor: colors['SHADELIGHT'],
                    backgroundColor: isEditing && selected.includes(item.clothId) ? colors['PRIMARY'] : colors['SHADEDARK']
                }]}>
                    {!isEditing && <FastImage
                        source={{ uri: ICONS.ICON_CLOSE }}
                        style={styles.icon}
                        tintColor={colors['WHITE']}
                    />}
                    {isEditing && selected.includes(item.clothId) &&
                        <FastImage
                            source={{ uri: ICONS.ICON_CHECK }}
                            style={styles.icon}
                            tintColor={colors['WHITE']}
                        />
                    }
                </Pressable>
            </View>
            <View>
                <CustomText top={5} left={5} color={colors['DARK']}>
                    {item.brand}
                </CustomText>
                <View style={styles.priceContainer}>
                    <CustomText size={11} weight='bold' color={colors['DARK']}>
                        {formatCurrency(Math.round(item.mrp * ((1 - item.discount / 100)))).split('.')[0]}
                    </CustomText>
                    {item.discount && <CustomText left={5} strike color={colors['SHADELIGHT']} size={11}>
                        {formatCurrency(item.mrp).split('.')[0]}
                    </CustomText>}
                    {item.discount && <CustomText left={5} color={colors['PRIMARY']} size={11}>
                        ({item.discount}% OFF)
                    </CustomText>}
                </View>
            </View>
            <Pressable onPress={moveToBagHandler} disabled={isEditing || disabled} style={[styles.bagContainer, { borderTopColor: colors['SHADELIGHT'] }]}>
                <CustomText align='center' color={isEditing ? colors['SHADEDARK'] : colors['PRIMARY']} weight='bold'>
                    MOVE TO BAG
                </CustomText>
            </Pressable>
            {isEditing && selected.includes(item.clothId) && <View style={[styles.overlay, { backgroundColor: colors['PRIMARY'] }]} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 375,
        width: '46.5%',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 4,
    },
    image: {
        flex: 1,
        resizeMode: 'cover'
    },
    imageContainer: {
        width: '100%',
        height: '75%'
    },
    priceContainer: {
        marginLeft: 5,
        marginTop: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    bagContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
    },
    iconContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        padding: 2,
        position: 'absolute',
        borderWidth: 1,
        right: 10,
        top: 10,
        zIndex: 12,
    },
    icon: { flex: 1 },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 12,
        opacity: 0.25
    }
})

export default Card