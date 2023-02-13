import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import COLORS from '../../constants/Colors'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useSelector } from 'react-redux'

const StickyFooter = ({ scroll, footer, addToBag, addToWishlist, wishlisted, sizeContainer }) => {

    const topEdge = footer?.y + sizeContainer?.height - 40
    const { colors } = useSelector(state => state.theme)

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
                    <TouchableOpacity onPress={addToWishlist} style={[styles.button, { borderColor: 'lightgray', borderWidth: 1, width: '40%' }]}>
                        <FastImage source={{ uri: wishlisted ? ICONS.ICON_HEART_ACTIVE : ICONS.ICON_HEART }} style={styles.icon} />
                        <CustomText weight={'light'} style={[styles.text]}>
                            WISHLIST
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addToBag} style={[styles.button, { backgroundColor: colors['PRIMARY'], width: '50%' }]}>
                        <FastImage tintColor={'white'} source={{ uri: ICONS.ICON_BAG }} style={styles.icon} />
                        <CustomText weight={'light'} color={COLORS.WHITE} style={[styles.text,]}>
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
        marginLeft: 10
    }
})

export default StickyFooter