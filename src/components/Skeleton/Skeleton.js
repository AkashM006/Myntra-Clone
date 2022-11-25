import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Skeleton = ({ height, width, borderRadius }) => {

    let opacity = useRef(new Animated.Value(0.3))

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 800,
                })
            ])
        ).start()
    }, [])

    return (
        <Animated.View style={{
            height,
            width,
            borderRadius,
            backgroundColor: 'lightgray',
            opacity: opacity.current,
            marginRight: 10,
        }} />
    )
}

export default Skeleton