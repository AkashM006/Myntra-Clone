import { BackHandler, FlatList, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import Quote from '../Home/Quote'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import CustomText from '../Reusable/CustomText'
import Overlay from '../Reusable/Overlay'
import SizeList from '../Bag/SizeList'
import CustomButton from '../Reusable/CustomButton'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from '../../utils/utils'
import { removeFromWishlist } from '../../redux/wishlistSlice'
import { useEffect } from 'react'
import PopUp from './PopUp'

const WishlistBody = () => {

    const { colors, theme } = useSelector(state => state.theme)
    const { items } = useSelector(state => state.wishlist)
    const [selected, setSelected] = useState(null)
    const [currentSize, setCurrentSize] = useState(null)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', _ => {
            if (selected !== null) {
                closePopUp()
                return true
            }
            return false
        })
        return () => handler.remove()
    }, [selected])

    const closePopUp = _ => {
        setSelected(null)
        setCurrentSize(null)
    }

    useEffect(() => {
        if (selected === null) setShow(false)
        else {
            setShow(true)
        }
    }, [selected])

    const handlePress = async _ => {
        setLoading(true)
        try {
            let result = await axios.post(`${Config.PRODUCTS_API_KEY}/data/movetobag`, {
                productId: selected.clothId,
                size: currentSize
            })
            if (!result.data.status)
                showToast(result.data.message)
            else {
                dispatch(removeFromWishlist(selected.clothId))
                closePopUp()
            }

        } catch (error) {
            console.log("Error in Wishlist/WishlistBody.js: ", error)
            showToast('Something went wrong while moving items to bag. Please try again later!')
        }
        setLoading(false)
    }

    function openPopUp(item) {
        setSelected(item)
        setShow(true)
    }

    function closePopUpHandler() {
        closePopUp()
    }

    return (
        <View style={{ backgroundColor: colors['LIGHT'], }}>
            <FlatList
                data={items}
                renderItem={({ item, index }) => <Card disabled={show} setSelected={openPopUp} item={item} index={index} />}
                keyExtractor={item => item.clothId}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 200, paddingTop: 20 }}
                ListFooterComponent={
                    <View style={{ paddingTop: 50 }}>
                        <Quote loading={false} />
                    </View>
                }
            />
            <Overlay render={show} zIndex={15} hideLoader hideShadow={theme === 'light'} onPressHandler={closePopUpHandler} />
            <PopUp selected={selected} currentSize={currentSize} handlePress={handlePress} setCurrentSize={setCurrentSize} />
        </View>
    )
}

export default WishlistBody