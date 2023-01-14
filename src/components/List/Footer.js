import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import Filter from './Filter'
import Sort from './Sort'
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor, Easing } from 'react-native-reanimated'

const Footer = () => {

    // const [isVisible, setIsVisible] = useState(false)
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
                    <Image source={require('../../icons/sort.png')} style={styles.icon} />
                    <CustomText weight={'bold'} style={styles.text}>
                        SORT
                    </CustomText>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <Image source={require('../../icons/filter.png')} style={styles.icon} />
                    <CustomText weight={'bold'} style={styles.text}>
                        FILTER
                    </CustomText>
                </TouchableOpacity>
            </View>
            {/* <Filter visible={isVisible} setVisibility={setIsVisible} /> */}
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
        tintColor: 'gray'
    },
    text: {
        color: 'black',
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