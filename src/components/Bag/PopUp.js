import { View, StyleSheet, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useState } from 'react'
import SizeList from './SizeList'
import QtyList from './QtyList'
import { editItem } from '../../redux/bagSlice'
import CustomButton from '../Reusable/CustomButton'

const PopUp = ({ render, id, info, setShowPopUp }) => {

    const dispatch = useDispatch()
    const sharedValue = useSharedValue(0)
    const { colors } = useSelector(state => state.theme)
    const { items } = useSelector(state => state.bag)

    const currentItem = items.find(item => item.id === id)

    const [selectedSize, setSelectedSize] = useState(currentItem?.currentSize)
    const [currentQty, setCurrentQty] = useState(currentItem?.qty)

    useEffect(() => {
        if (currentItem) {
            setSelectedSize(currentItem?.currentSize)
            setCurrentQty(currentItem?.qty)
        }
    }, [currentItem])

    useEffect(() => {
        if (render === false) {
            setSelectedSize(currentItem?.currentSize)
            setCurrentQty(currentItem?.qty)
        }
    }, [render])

    const rStyle = useAnimatedStyle(() => {
        return {
            bottom: interpolate(
                sharedValue.value,
                [0, 1],
                [-220, 0]
            )
        }
    })

    useEffect(() => {
        let dest = render ? 1 : 0
        sharedValue.value = withTiming(dest, {
            duration: 200
        })
    }, [render])

    const onDoneHandler = () => {
        if (currentItem.currentSize === selectedSize && currentItem.qty === currentQty) return
        if (info === 'Size') currentItem.currentSize = selectedSize
        else currentItem.qty = currentQty
        dispatch(editItem(currentItem))
        setShowPopUp(false)
    }

    return (
        <Animated.View style={[styles.container, rStyle, { backgroundColor: colors['LIGHT'], height: info === 'Size' ? 200 : 170, }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 20 }}>
                <CustomText color={colors['SHADEDARK']} weight='bolder' size={14} >
                    Select {info}
                </CustomText>
                <Pressable onPress={() => setShowPopUp(false)}>
                    <FastImage
                        source={{ uri: ICONS.ICON_CLOSE }}
                        style={{ height: 15, width: 15 }}
                        tintColor={colors['DARK']}
                    />
                </Pressable>
            </View>
            {info === 'Size' ?
                <SizeList size={selectedSize} setSize={setSelectedSize} item={currentItem} /> :
                <QtyList qty={currentQty} setQty={setCurrentQty} item={currentItem} />
            }
            <CustomButton
                text='DONE'
                onPressHandler={onDoneHandler}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        zIndex: 12,
        paddingVertical: 10,
        paddingHorizontal: '3.5%',
    },
})

export default PopUp