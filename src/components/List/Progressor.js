import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated'

const Progressor = ({ count, items }) => {

    const [itemsCount, setItemsCount] = useState(0)

    const alter = value => setItemsCount(value)

    useAnimatedReaction(
        () => items.value,
        (result, prev) => {
            runOnJS(alter)(items.value)
        }, [items]
    )

    const rStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                items.value,
                [0, 8, 10, 11],
                [0, 0, 1, 1]
            )
        }
    })

    return (
        <Animated.View style={[styles.container, rStyle]}>
            <View style={styles.leftContainer}>
                <Image source={require('../../icons/back.png')} style={styles.icon} />
                <CustomText style={styles.text}>
                    MYNTRA
                </CustomText>
            </View>
            <CustomText style={styles.text}>
                {itemsCount}/{count}
            </CustomText>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 12,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignSelf: 'center',
        top: 30,
        width: '50%',
        padding: 5,
        borderRadius: 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white'
    },
    leftContainer: {
        flexDirection: 'row'
    },
    icon: {
        tintColor: 'white',
        height: 20,
        width: 20,
        transform: [
            {
                rotate: '90deg'
            }
        ]
    }
})

export default Progressor