import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { kFormatter } from '../../utils/utils'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Rating = ({ count, total, align }) => {

    const alignment = {
        left: { left: 10 },
        right: { right: 10 },
    }

    let currentAlignment = align ?? 'left'

    return (
        <View style={[styles.container, alignment[currentAlignment]]}>
            <CustomText weight={'light'}>
                {(total / count).toFixed(1)}
            </CustomText>
            <FastImage tintColor={'#259f23'} source={{ uri: ICONS.ICON_STAR }} style={styles.star} />
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
    star: {
        height: 8,
        width: 8,
        marginLeft: 2,
        marginRight: 5,
    },
    separator: {
        height: 10,
        borderRightWidth: 1,
        borderColor: '#909090'
    },
    count: {
        marginLeft: 5
    }
})

export default Rating