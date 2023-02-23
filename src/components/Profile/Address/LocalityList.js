import { View, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { FadeIn, SlideInDown, SlideInUp, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const LocalityList = ({ data, render, setRender }) => {

    const names = data.map(el => el.name)
    const { colors } = useSelector(state => state.theme)
    const translateValue = useSharedValue(0)

    const maxHeight = data.length > 5 ? 5 * 100 : data.length * 100

    useEffect(() => {
        const dest = render ? 1 : 0
        translateValue.value = withTiming(dest, {
            duration: 200
        })
    }, [render])

    return (
        <Animated.View entering={render ? SlideInUp.duration(3000) : null} style={[styles.container, { backgroundColor: colors['LIGHT'], height: 300 + maxHeight }]}>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 15,
        borderColor: 'black',
        borderWidth: 1
    }
})

export default LocalityList