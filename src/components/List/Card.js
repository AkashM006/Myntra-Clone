import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { calculateDiscount, formatCurrency, months, substring } from '../../utils/utils'
import Rating from './Rating'
import { useNavigation } from '@react-navigation/native'

const Card = ({ cloth, index }) => {

    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const [isFavourite, setIsFavourite] = useState(false)

    const activeHeart = require('../../icons/heart-active.png')
    const heart = require('../../icons/heart.png')

    const hasDiscount = (cloth.discount && cloth.discount > 0) ? true : false

    let date = ''

    if (cloth.delivery) {
        let today = new Date()
        let result = new Date(today.setDate(today.getDate() + cloth.delivery))
        date = result.getDate() + ' ' + months[result.getMonth()]
    }

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

    const hasRating = (cloth.ratedCount > 0) ? true : false

    const pressHandler = () => {
        navigation.navigate('Detail', {
            name: cloth.name
        })
    }

    return (
        <TouchableOpacity onPress={pressHandler} style={[styles.container, { height: (height - 65) / 2, borderRightWidth: 1 }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: cloth.photo }} style={styles.image} />
                {hasRating && <Rating count={cloth.ratedCount} total={cloth.totalRating} />}
            </View>
            <View style={styles.body}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.text}>
                        {substring(cloth.brand, 20)}
                    </CustomText>
                    <TouchableOpacity onPress={() => setIsFavourite(prev => !prev)}>
                        {isFavourite === true ?
                            <Image source={activeHeart} style={styles.icon} /> :
                            <Image source={heart} style={styles.icon} />
                        }
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
                {cloth.delivery && cloth.delivery > 0 && <CustomText style={styles.date}>
                    Delivered by {date}
                </CustomText>}
            </View>
        </TouchableOpacity>
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
        color: 'gray',
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
    },
    date: {
        color: 'gray',
        fontSize: 12
    }
})

const arePropsEqual = (prev, next) => {
    for (let key in prev) {
        if (!(key in next) || prev[key] !== next[key]) return false
    }
    return true
}

export default memo(Card, arePropsEqual)