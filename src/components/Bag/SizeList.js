import { View, ScrollView, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import { calculateDiscountedPrice, formatCurrency } from '../../utils/utils'

const SizeList = ({ item, size, setSize }) => {

    const sizes = item?.size
    const { colors } = useSelector(state => state.theme)

    return (
        <View style={{ height: 110 }}>
            {sizes && <ScrollView
                style={styles.scroll}
                contentContainerStyle={{ height: 50 }}
                horizontal
            >
                {sizes.map(item => {
                    const pressHandler = () => { setSize(item.name) }

                    const getColor = _ => {
                        if (item.name === size) return colors['PRIMARY']
                        else if (item.available) return colors['DARK']
                        return colors['SHADEDARK']
                    }

                    return <Pressable
                        disabled={!item.available}
                        style={[styles.circle, { borderColor: getColor() }]}
                        key={item.name}
                        onPress={pressHandler}
                    >
                        <CustomText color={getColor()} weight='bold'>
                            {item.name}
                        </CustomText>
                        {!item.available && <View style={[styles.line, { backgroundColor: colors['SHADEDARK'] }]} />}
                    </Pressable>
                })}
            </ScrollView>}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <CustomText color={colors['DARK']} size={13} weight='bolder'>
                    {formatCurrency(calculateDiscountedPrice(item.mrp, item.discount)).split('.')[0]}
                </CustomText>
                {item.discount && <CustomText color={colors['SHADELIGHT']} left={10} style={{ textDecorationLine: 'line-through' }}>
                    {formatCurrency(item.mrp).split('.')[0]}
                </CustomText>}
                {item.discount && <CustomText color={colors['PRIMARY']} size={13}>
                    {' '}( {item.discount}% OFF )
                </CustomText>}
            </View>
            <View>
                <CustomText color={colors['SHADELIGHT']}>
                    Seller:
                    <CustomText weight='light' color={colors['DARK']}>
                        {" "}{item.soldBy}
                    </CustomText>
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 50,
        borderRadius: 200,
        borderWidth: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        height: 1,
        left: 0,
        right: 0
    },
    scroll: {
        marginTop: 20,
    }
})

export default SizeList