import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const PopUp = ({ render }) => {

    const sharedValue = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => {
        return {
            bottom: interpolate(
                sharedValue.value,
                [0, 1],
                [-300, 0]
            )
        }
    })

    useEffect(() => {
        let dest = render ? 1 : 0
        sharedValue.value = withTiming(dest, {
            duration: 500
        })
    }, [render])

    return (
        <Animated.View style={[styles.container, rStyle]}>
            <Text>PopUp</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: 250,
        backgroundColor: 'white',
        bottom: 0,
        left: 0,
        right: 0,
        borderColor: 'black',
        borderWidth: 1,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        zIndex: 12
    }
})

export default PopUp