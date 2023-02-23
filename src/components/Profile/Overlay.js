import { StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { setLoginPopUpStatus } from '../../redux/uiSlice'

const Overlay = () => {

    const isVisible = useSelector(state => state.ui.isLoginPopUpVisible)

    const visibility = useSharedValue(0)

    const dispatch = useDispatch()

    const pressHandler = () => dispatch(setLoginPopUpStatus(false))

    useEffect(() => {
        let target = (isVisible === true) ? 1 : 0
        visibility.value = withTiming(target, { duration: 300 })
    }, [isVisible])

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                visibility.value,
                [0, 1],
                ['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']
            ),
            display: visibility.value === 0 ? 'none' : 'flex'
        }
    }, [])

    return (
        <Animated.View style={[styles.container, backgroundStyle]}>
            <Pressable style={{ width: '100%', height: '100%' }} onPress={pressHandler} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    }
})

export default Overlay