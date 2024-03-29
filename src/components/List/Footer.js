import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import Sort from './Sort'
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor, Easing } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Footer = () => {

    const visibility = useSharedValue(0)

    const sortHandler = () => {
        visibility.value = withTiming(1, {
            duration: 300
        })
    }

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

    const pressHandler = () => {
        visibility.value = withTiming(0, {
            duration: 300,
            easing: Easing.in
        })
    }

    return (
        <>
            <View style={styles.top} />
            <View style={styles.container}>
                <TouchableOpacity onPress={sortHandler} style={styles.option}>
                    <FastImage tintColor={'gray'} source={{ uri: ICONS.ICON_SORT }} style={styles.icon} />
                    <CustomText weight={'bold'}>
                        SORT
                    </CustomText>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <FastImage tintColor={'gray'} source={{ uri: ICONS.ICON_FILTER }} style={styles.icon} />
                    <CustomText weight={'bold'}>
                        FILTER
                    </CustomText>
                </TouchableOpacity>
            </View>
            <Sort visible={visibility} />
            <Animated.View style={[styles.modal, backgroundStyle]}>
                <Pressable style={{ width: '100%', height: '100%' }} onPress={pressHandler} />
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    option: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    separator: {
        height: 25,
        width: 1,
        backgroundColor: 'gray',
        alignSelf: 'center'
    },
    top: {
        width: '100%',
        height: 1,
        borderTopWidth: 1,
        borderColor: 'lightgray'
    },
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10
    }
})

export default Footer