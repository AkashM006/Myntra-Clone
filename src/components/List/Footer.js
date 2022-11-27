import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Footer = () => {
    return (
        <>
            <View style={styles.top} />
            <View style={styles.container}>
                <TouchableOpacity style={styles.option}>
                    <Image source={require('../../icons/sort.png')} style={styles.icon} />
                    <CustomText style={styles.text}>
                        SORT
                    </CustomText>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <Image source={require('../../icons/filter.png')} style={styles.icon} />
                    <CustomText style={styles.text}>
                        FILTER
                    </CustomText>
                </TouchableOpacity>
            </View>
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
        fontWeight: '800',
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
    }
})

export default Footer