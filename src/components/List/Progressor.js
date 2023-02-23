import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useRoute } from '@react-navigation/native'
import { substring } from '../../utils/utils'
import COLORS from '../../constants/Colors'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Progressor = ({ count, items, goTop }) => {

    const { title } = useRoute().params

    return (
        <>
            {items >= 10 && <View style={styles.animatedContainer}>
                <TouchableOpacity style={styles.container} onPress={goTop}>
                    <View style={styles.leftContainer}>
                        <FastImage tintColor={'white'} source={{ uri: ICONS.ICON_BACK }} style={styles.icon} />
                        <CustomText color={COLORS.WHITE} style={styles.text}>
                            {substring(title.toUpperCase(), 10)}
                        </CustomText>
                    </View>
                    <CustomText color={COLORS.WHITE} style={styles.text}>
                        {items}/{count}
                    </CustomText>
                </TouchableOpacity>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    animatedContainer: {
        position: 'absolute',
        zIndex: 12,
        top: 30,
        width: '50%',
        alignSelf: 'center',
    },
    container: {
        width: '100%',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'row'
    },
    icon: {
        height: 20,
        width: 20,
        transform: [
            {
                rotate: '90deg'
            }
        ]
    }
})

export default Progressor