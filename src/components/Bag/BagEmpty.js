import { Image, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const BagEmpty = () => {
    return (
        <>
            <FastImage
                source={{ uri: ICONS.ICON_BAG_EMPTY }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
            <CustomText align={'center'} size={24} weight='bold'>
                Hey, it feels so light!
            </CustomText>
            <CustomText align={'center'} color={COLORS.SHADELIGHT}>
                There is nothing in your bag. Let's add some items.
            </CustomText>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 200,
        alignSelf: 'center',
        borderColor: 'black',
        marginBottom: 40,
        width: '100%'
    }
})

export default BagEmpty