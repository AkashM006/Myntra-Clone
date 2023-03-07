import { View, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import SizeList from './SizeList'
import QtyList from './QtyList'
import CustomButton from '../Reusable/CustomButton'
import axios from 'axios'
import Config from 'react-native-config'
import LoaderContext from '../../context/loaderContext'
import { showToast } from '../../utils/utils'

const PopUp = ({ render, id, info, setShowPopUp }) => {

    const sharedValue = useSharedValue(0)
    const { colors } = useSelector(state => state.theme)
    const { items } = useSelector(state => state.bag)
    const { refresh, setLoaded } = useContext(LoaderContext)

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
                [-220, -15]
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
        setLoaded(false)
        if (currentItem.currentSize === selectedSize && currentItem.qty === currentQty) return
        let target = {
            productId: currentItem.clothId,
            size: currentItem.currentSize
        }
        if (info === 'Size')
            target.newSize = selectedSize
        else
            target.quantity = currentQty

        axios.put(`${Config.API_KEY}/bag`, {
            ...target
        })
            .then(res => {
                setShowPopUp(false)
                refresh()
            })
            .catch(err => {
                console.log("Error in Bag/PopUp.js: ", err)
                showToast('Something went wrong while editing your bag. Please try again later')
            })
    }

    return (
        <Pressable onPress={_ => setShowPopUp(false)} style={render ? styles.overlay : {}}>
            <Animated.View style={[styles.container, rStyle, { backgroundColor: colors['LIGHT'], height: info === 'Size' ? 220 : 170, }]}>
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
            {/* {render && <Pressable onPress={_ => setShowPopUp(false)} style={styles.overlay} />} */}
            {/* <Overlay render={render} hideLoader onPressHandler={() => setShowPopUp(false)} /> */}
        </Pressable>
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
        zIndex: 10000,
        paddingTop: 10,
        paddingHorizontal: '3.5%',
        elevation: 10,
        flex: 1
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10
    }
})

export default PopUp