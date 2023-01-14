import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { kFormatter } from '../../utils/utils'

const Rating = ({ count, total, align }) => {

    const alignment = {
        left: { left: 10 },
        right: { right: 10 },
    }

    let currentAlignment = align ?? 'left'

    return (
        <View style={[styles.container, alignment[currentAlignment]]}>
            <CustomText weight={'light'} style={styles.rating}>
                {(total / count).toFixed(1)}
            </CustomText>
            <Image source={require('../../icons/star.png')} style={styles.star} />
            <View style={styles.separator} />
            <CustomText weight={'light'} style={styles.count}>
                {kFormatter(count)}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 4,
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: '5%',
        paddingVertical: '2%',
        bottom: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    rating: {
        color: 'black',
        fontSize: 12,
    },
    star: {
        height: 8,
        width: 8,
        marginLeft: 2,
        marginRight: 5,
        tintColor: '#259f23',
    },
    separator: {
        height: 10,
        borderRightWidth: 1,
        borderColor: '#909090'
    },
    count: {
        fontSize: 12,
        color: 'black',
        marginLeft: 5
    }
})

export default Rating