import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

const StickyFooter = ({ scroll, footer }) => {

    const topEdge = footer?.y - 90 + footer?.height

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scroll.value,
                        [-1, 0, topEdge - 1, topEdge, topEdge + 1],
                        [0, 0, 0, 0, -1]
                    )
                }
            ]
        }
    })

    return (
        <>
            {footer && <Animated.View
                style={[styles.container, rStyle]}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { borderColor: 'lightgray', borderWidth: 1, width: '40%' }]}>
                        <Image source={require('../../icons/heart.png')} style={styles.icon} />
                        <CustomText style={[styles.text, { color: 'black' }]}>
                            WISHLIST
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#ff3e6c', width: '50%' }]}>
                        <Image source={require('../../icons/bag.png')} style={[styles.icon, { tintColor: 'white' }]} />
                        <CustomText style={[styles.text, { color: 'white' }]}>
                            ADD TO BAG
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </Animated.View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        position: 'absolute',
        bottom: 0,
        zIndex: 12,
        backgroundColor: 'white',
        left: 0,
        right: 0,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 3,
        height: 50
    },
    icon: {
        height: 30,
        width: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    text: {
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 10
    }
})

export default StickyFooter