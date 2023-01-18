import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'

const BagEmpty = () => {
    return (
        <View>
            <Image source={require('../../icons/bag_empty.png')} style={styles.image} />
            <CustomText align={'center'} size={24} weight='bold'>
                Hey, it feels so light!
            </CustomText>
            <CustomText align={'center'} color={COLORS.SHADELIGHT}>
                There is nothing in your bag. Let's add some items.
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 200,
        alignSelf: 'center',
        borderColor: 'black',
        marginBottom: 40
    }
})

export default BagEmpty