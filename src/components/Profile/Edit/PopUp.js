import { Image, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import CustomText from '../../Reusable/CustomText'
import COLORS from '../../../constants/Colors'
import RadioButton from './RadioButton'
import CustomButton from '../../Reusable/CustomButton'
import FastImage from 'react-native-fast-image'
import ICONS from '../../../icons/icons'

const PopUp = ({ numbers, render, setPopUp, sendOTP }) => {

    const scroll = useSharedValue(0)

    useEffect(() => {
        let value = render ? 1 : 0
        scroll.value = withTiming(value, {
            duration: 250
        })
        if (render === false)
            setActive('')
    }, [render])

    const height = numbers.length === 1 ? 270 : 310
    const rStyle = useAnimatedStyle(() => {
        return {
            bottom: interpolate(
                scroll.value,
                [0, 1],
                [-300, 0]
            )
        }
    }, [])

    const [active, setActive] = useState('')

    const submitHandler = () => {
        if (active === '') return
        sendOTP(active)
    }

    return (
        <Animated.View style={[styles.container, rStyle, { height: height }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <CustomText size={18} weight='bold' >2-Step Verification Required</CustomText>
                <Pressable onPress={() => setPopUp(false)}>
                    <FastImage source={{ uri: ICONS.ICON_CLOSE }} style={{ height: 20, width: 20 }} />
                </Pressable>
            </View>
            <CustomText color={COLORS.SHADEDARK} size={11} vertical={20} >
                For better security, choose a previously used mobile number to request OTP.
            </CustomText>
            <View>
                <RadioButton active={active} setActive={() => setActive(numbers[0])} text={numbers[0]} />
                {numbers.length === 2 && <RadioButton active={active} setActive={() => setActive(numbers[1])} text={numbers[1]} />}
            </View>
            <CustomButton
                text='REQUEST OTP'
                onPressHandler={submitHandler}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -3000,
        left: 0,
        right: 0,
        zIndex: 12,
        paddingHorizontal: '5%',
        paddingVertical: 10,
        paddingTop: 30
    }
})

export default PopUp