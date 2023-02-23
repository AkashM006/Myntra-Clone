import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/utils'

const Price = () => {
    const { colors } = useSelector(state => state.theme)
    const { selected, items } = useSelector(state => state.bag)

    const calculateTotalMrp = () => {
        return items.reduce((total, item) => {
            if (selected.includes(item.id)) return total + (item.mrp * item.qty)
            return total
        }, 0)
    }

    const calculateDiscount = () => {
        return items.reduce((total, item) => {
            if (selected.includes(item.id)) return total + (item.qty * Math.round(item.mrp * item.discount / 100))
            return total
        }, 0)
    }

    const calculateTotal = () => {
        return calculateTotalMrp() - calculateDiscount()
    }

    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, { borderBottomColor: colors['SHADELIGHT'] }]}>
                <CustomText weight='bolder' color={colors['DARK']} >
                    PRICE DETAILS ({selected.length} Items)
                </CustomText>
            </View>
            <View style={styles.row}>
                <CustomText color={colors['DARK']} size={13}>
                    Total MRP
                </CustomText>
                <CustomText color={colors['DARK']} size={13}>
                    {formatCurrency(calculateTotalMrp()).split('.')[0]}
                </CustomText>
            </View>
            {calculateDiscount() > 0 && <View style={styles.row}>
                <CustomText color={colors['DARK']} size={13}>
                    Discount on MRP
                </CustomText>
                <CustomText color={'green'} size={13}>
                    - {formatCurrency(calculateDiscount()).split('.')[0]}
                </CustomText>
            </View>}
            <View style={[styles.row, { borderTopColor: colors['SHADELIGHT'], borderTopWidth: 1, paddingTop: 10 }]}>
                <CustomText color={colors['DARK']} size={14} weight='bold'>
                    Total Amount
                </CustomText>
                <CustomText color={colors['DARK']} size={14} weight='bold'>
                    {formatCurrency(calculateTotal()).split('.')[0]}
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10
    },
    headerContainer: {
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})

export default Price