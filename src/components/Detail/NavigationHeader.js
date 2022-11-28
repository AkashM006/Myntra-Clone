import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const NavigationHeader = () => {
    return (
        <View style={styles.header}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Image source={require('../../icons/back.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.leftContainer}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10
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
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '45%'
    },
})

export default NavigationHeader