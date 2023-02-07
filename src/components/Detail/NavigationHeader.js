import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import CustomText from '../Reusable/CustomText'
import { substring } from '../../utils/utils'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Badge from '../Reusable/Badge'
import { useSelector } from 'react-redux'

const NavigationHeader = ({ scroll, name }) => {

    const navigation = useNavigation()
    const height = useWindowDimensions().height
    const imageHeight = height / 1.35
    const bagItems = useSelector(state => state.bag.items)
    const wishlistItems = useSelector(state => state.wishlist.items)

    const rStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                scroll.value,
                [0, imageHeight + 10],
                ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
            )
        }
    }, [])

    const textStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scroll.value,
                [0, imageHeight - 30, imageHeight - 10],
                [0, 0, 1]
            )
        }
    }, [])

    return (
        <>
            {scroll && <Animated.View style={[styles.header, rStyle]}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                        <FastImage source={{ uri: ICONS.ICON_BACK }} style={styles.icon} />
                    </TouchableOpacity>
                    <CustomText isAnimated={true} weight={'bold'} size={18} style={textStyle}>
                        {substring(name, 20)}
                    </CustomText>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <FastImage source={{ uri: ICONS.ICON_SHARE }} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Wishlist')} >
                        <FastImage source={{ uri: ICONS.ICON_HEART }} style={styles.icon} />
                        <Badge top={5} dim={15} right={3} count={wishlistItems.length} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <FastImage source={{ uri: ICONS.ICON_BAG }} style={styles.icon} />
                        <Badge top={5} dim={15} right={5} count={bagItems.length} />
                    </TouchableOpacity>
                </View>
            </Animated.View>}
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 20,
        padding: 10,
        paddingRight: '5%'
    },
    iconContainer: {
        padding: 10,
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderRadius: 100
    },
    icon: {
        height: 20,
        width: 20
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '45%'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default NavigationHeader