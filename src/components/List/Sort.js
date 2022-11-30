import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import CustomText from '../Reusable/CustomText'

const Sort = ({ visible }) => {

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(visible.value, [0, 1], [300, 0])
            }]
        }
    }, [])

    return (
        <Animated.View style={[styles.container, rStyle]}>
            <View style={styles.contentContainer}>
                <CustomText style={styles.heading}>
                    SORT BY
                </CustomText>
                <TouchableOpacity style={styles.textContainer}>
                    <CustomText style={styles.text}>
                        Price - high to low
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textContainer}>
                    <CustomText style={styles.text}>
                        discount
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textContainer}>
                    <CustomText style={styles.text}>
                        Price - low to high
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textContainer}>
                    <CustomText style={styles.text}>
                        Customer Rating
                    </CustomText>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 250,
        transform: [
            { translateY: 300 }
        ],
        zIndex: 11
    },
    contentContainer: {
        padding: 10,
        height: '100%'
    },
    heading: {
        color: 'gray',
        paddingHorizontal: 5,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 10
    },
    text: {
        color: 'black',
        textTransform: 'uppercase'
    },
    textContainer: {
        width: '100%',
        height: 50
    }
})

export default Sort