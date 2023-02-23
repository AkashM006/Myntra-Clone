import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { calculateDiscount, formatCurrency } from '../../utils/utils'
import COLORS from '../../constants/Colors'

const Header = ({ brand, name, price, discount }) => {

    const hasDiscount = discount === null ? false : true

    const priceStyle = {
        true: {
            textDecorationLine: 'line-through',
            color: COLORS.SHADEDARK
        },
        false: {
            fontWeight: '800',
            color: COLORS.SHADELIGHT
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <CustomText weight={'bold'} size={16}>
                    {brand}
                    <CustomText color={COLORS.SHADEDARK}>
                        {' ' + name}
                    </CustomText>
                </CustomText>
            </View>
            <View>
                <View style={styles.priceContainer}>
                    {hasDiscount && <CustomText color={COLORS.SHADEDARK} style={{ marginRight: 5 }}>
                        MRP
                    </CustomText>}
                    <CustomText size={14} style={[styles.price, priceStyle[hasDiscount]]}>
                        {formatCurrency(price).split('.')[0]}
                    </CustomText>
                    {hasDiscount && <CustomText weight={'light'} style={styles.discountedPrice}>
                        {formatCurrency(+calculateDiscount(price, discount)).split('.')[0]}
                    </CustomText>}
                    {hasDiscount && <CustomText color={COLORS.PRIMARY} style={styles.discount}>
                        ({discount}% OFF)
                    </CustomText>}
                </View>
                <CustomText color={COLORS.SHADEDARK} style={styles.info}>
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
    titleContainer: {
        width: '70%',
        flexDirection: 'row'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    price: {
        marginTop: 2
    },
    info: {
        marginVertical: 2
    },
    discountedPrice: {
        marginLeft: 5,
    },
    discount: {
        marginLeft: 5,
    },
})

export default Header