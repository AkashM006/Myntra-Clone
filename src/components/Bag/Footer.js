import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import CustomButton from '../Reusable/CustomButton'
import { showToast } from '../../utils/utils'

const Footer = () => {

    const { colors } = useSelector(state => state.theme)
    const { selected, items } = useSelector(state => state.bag)
    const selectedCount = items.reduce((total, item) => {
        return item.selected ? total + 1 : total
    }, 0)

    const onPressHandler = _ => {
        // check if all items exist and then let user know
        if (selected.length === 0) {
            showToast('Select at least one item in bag to place order')
            return
        }
        // let isValid = true
        let isValid = items.every(item => {
            if (selected.includes(item.id)) {
                const size = item.currentSize
                const sizes = item.size
                return sizes.some(value => value.name === size && value.maxQty >= item.qty)
            }
            return true
        })

        if (!isValid) showToast('Item(s) in your bag are out of stock. Please move them from bag to proceed.')
        else showToast('You are good to go!')

    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={styles.textContainer}>
                <CustomText size={11} align='center' weight='light' color={colors['BLACK']}>
                    {
                        selectedCount === 0 ?
                            'No Item selected, select at least one item to place order.' :
                            `${selectedCount} ${selectedCount === 1 ? 'Item' : 'Items'} selected for order`
                    }
                </CustomText>
            </View>
            <View style={{ paddingHorizontal: '3.5%', }}>
                <CustomButton onPressHandler={onPressHandler} top={10} text='PLACE ORDER' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    textContainer: {
        backgroundColor: '#ffebeb',
        paddingHorizontal: '3.5%',
        paddingVertical: 5,
    }
})

export default Footer