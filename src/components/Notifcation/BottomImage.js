import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Image } from 'react-native'

const BottomImage = ({ image }) => {

    const offset = useSharedValue(0)

    useEffect(() => {
        offset.value = withTiming(200, {
            duration: 1000
        })
        return () => {
            offset.value = withTiming(0, {
                duration: 1000
            })
        }
    }, [])

    const rStyle = useAnimatedStyle(() => {
        return {
            height: offset.value
        }
    }, [])

    return (
        <Animated.Image
            source={{ uri: image }}
            style={[{ width: '100%', marginTop: 10 }, rStyle]}
        />
    )
}

export default BottomImage