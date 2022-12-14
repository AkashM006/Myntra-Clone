import { View, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import CustomText from '../Reusable/CustomText'
import { substring } from '../../utils/utils'

const NavigationHeader = ({ scroll, name }) => {

    const navigation = useNavigation()
    const height = useWindowDimensions().height
    const imageHeight = height / 1.35

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
                        <Image source={require('../../icons/back.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <CustomText isAnimated={true} style={[styles.title, textStyle]}>
                        {substring(name, 20)}
                    </CustomText>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={require('../../icons/share.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={require('../../icons/heart.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={require('../../icons/bag.png')} style={styles.icon} />
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
    title: {
        fontWeight: '800',
        fontSize: 18,
        color: 'black',
        // alignSelf: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default NavigationHeader