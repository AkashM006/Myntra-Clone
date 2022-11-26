import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { calculateDiscount, formatCurrency, substring } from '../../utils/utils'

const Card = ({ cloth, index }) => {

    // todo: 
    // Need to add delivery date by adding dates
    // do the rating component and connect to next page
    // in rating display thousands in k and so on
    // need to do the foot component
    // need to detect scroll and show the number of items

    const { height } = useWindowDimensions()
    const [isFavourite, setIsFavourite] = useState(false)

    const activeHeart = require('../../icons/heart-active.png')
    const heart = require('../../icons/heart.png')

    const hasDiscount = (cloth.discount && cloth.discount > 0) ? true : false

    const priceTextStyle = {
        true: {
            color: 'lightgray',
            textDecorationLine: 'line-through'
        },
        false: {
            color: 'gray',
            fontWeight: '700'
        }
    }

    return (
        <View style={[styles.container, { height: (height - 65) / 2, borderRightWidth: 1 }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: cloth.photo }} style={styles.image} />
            </View>
            <View style={styles.body}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.text}>
                        {substring(cloth.brand, 20)}
                    </CustomText>
                    <TouchableOpacity onPress={() => setIsFavourite(prev => !prev)}>
                        <Image source={isFavourite === false ? heart : activeHeart} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <CustomText style={styles.name}>
                    {substring(cloth.name, 30)}
                </CustomText>
                <View style={styles.priceContainer}>
                    <CustomText style={[styles.price, priceTextStyle[hasDiscount]]}>
                        {formatCurrency(cloth.price).split('.')[0]}
                    </CustomText>
                    {hasDiscount && <CustomText style={styles.discount}>
                        {formatCurrency(+calculateDiscount(cloth.price, cloth.discount)).split('.')[0]}
                    </CustomText>}
                    {hasDiscount && <CustomText style={styles.percentage}>
                        {cloth.discount + '% OFF'}
                    </CustomText>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        backgroundColor: 'white',
        elevation: 2,
        borderColor: 'lightgray',
        borderBottomWidth: 1,
    },
    imageContainer: { height: '75%', },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        height: 20,
        width: 20,
    },
    body: {
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    text: {
        color: '#696969',
        fontWeight: '800',
        fontSize: 14,
    },
    name: {
        fontSize: 10,
        color: 'lightgray',
        marginTop: 2
    },
    priceContainer: { flexDirection: 'row', marginTop: 2, alignItems: 'center' },
    price: { fontSize: 14, },
    discount: {
        fontSize: 12,
        fontWeight: '700',
        color: 'black',
        marginLeft: 5,
    },
    percentage: {
        fontSize: 12,
        color: '#FF69B4',
        marginLeft: 3,
    }
})

export default Card