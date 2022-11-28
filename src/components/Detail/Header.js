import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { calculateDiscount, formatCurrency } from '../../utils/utils'

const Header = ({ brand, name, price, discount }) => {

    const hasDiscount = discount === null ? false : true

    const priceStyle = {
        true: {
            textDecorationLine: 'line-through',
            color: 'gray'
        },
        false: {
            fontWeight: '800',
            color: '#696969'
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <CustomText style={styles.brand}>
                    {brand}
                    <CustomText style={styles.name}>
                        {' ' + name}
                    </CustomText>
                </CustomText>
            </View>
            <View>
                <View style={styles.priceContainer}>
                    {hasDiscount && <CustomText style={{ fontSize: 12, color: 'gray', marginRight: 5 }}>
                        MRP
                    </CustomText>}
                    <CustomText style={[styles.price, priceStyle[hasDiscount]]}>
                        {formatCurrency(price).split('.')[0]}
                    </CustomText>
                    {hasDiscount && <CustomText style={styles.discountedPrice}>
                        {formatCurrency(+calculateDiscount(price, discount)).split('.')[0]}
                    </CustomText>}
                    {hasDiscount && <CustomText style={styles.discount}>
                        ({discount}% OFF)
                    </CustomText>}
                </View>
                <CustomText style={styles.info}>
                    Inclusive of all taxes
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: 'white',
        paddingBottom: 10,
        marginBottom: 10
    },
    brand: {
        color: 'black',
        fontWeight: '800',
        fontSize: 16
    },
    titleContainer: {
        width: '70%',
        flexDirection: 'row'
    },
    name: { color: 'gray' },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 14,
        marginTop: 2
    },
    info: {
        color: 'gray',
        fontSize: 12,
        marginVertical: 2
    },
    discountedPrice: {
        color: 'black',
        marginLeft: 5,
        fontWeight: '700'
    },
    discount: {
        marginLeft: 5,
        color: '#FF69B4'
    },
})

export default Header