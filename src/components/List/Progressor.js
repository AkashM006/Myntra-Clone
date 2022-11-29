import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import Animated, { interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated'

const Progressor = ({ count, items, goTop }) => {

    const [itemsCount, setItemsCount] = useState(0)

    const alter = value => setItemsCount(value)

    useAnimatedReaction(
        () => items.value,
        (result, prev) => {
            if (items.value !== itemsCount)
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
    }, [])

    return (
        <Animated.View style={[styles.animatedContainer, rStyle]}>
            <TouchableOpacity style={styles.container} onPress={goTop}>
                <View style={styles.leftContainer}>
                    <Image source={require('../../icons/back.png')} style={styles.icon} />
                    <CustomText style={styles.text}>
                        MYNTRA
                    </CustomText>
                </View>
                <CustomText style={styles.text}>
                    {itemsCount}/{count}
                </CustomText>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    animatedContainer: {
        position: 'absolute',
        zIndex: 12,
        top: 30,
        width: '50%',
        alignSelf: 'center',
    },
    container: {
        width: '100%',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
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