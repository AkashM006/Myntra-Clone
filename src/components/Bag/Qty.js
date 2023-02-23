import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Qty = ({ qty, id, showPopUpHandler, disabled }) => {

    const { colors } = useSelector(state => state.theme)

    const pressHandler = () => showPopUpHandler('Quantity', id)

    return (
        <Pressable disabled={disabled} onPress={pressHandler} style={styles.container}>
            <CustomText style={{ textDecorationLine: disabled ? 'line-through' : 'none' }} right={3} weight='bold'>
                Qty: {qty}
            </CustomText>
            <FastImage
                source={{ uri: ICONS.ICON_DOWN_CARET }}
                style={{ height: 10, width: 10 }}
                tintColor={colors['BLACK']}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        paddingHorizontal: 7,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    }
})

export default Qty