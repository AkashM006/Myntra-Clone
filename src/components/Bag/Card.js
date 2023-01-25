import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import CustomText from '../Reusable/CustomText'
import CheckBox from '../Reusable/CheckBox'
import { addSelection, removeFromBag, removeSelection } from '../../redux/bagSlice'
import { substring } from '../../utils/utils'
import Size from './Size'

const Card = ({ item }) => {

    const { selected } = useSelector(state => state.bag)
    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const onPressHandler = () => {
        if (selected.includes(item.id))
            dispatch(removeSelection(item.id))
        else
            dispatch(addSelection(item.id))
    }

    const removeHandler = () => {
        dispatch(removeFromBag(item.id))
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginLeft: '5%' }}>
                <View>
                    <CustomText weight='bolder' color={colors['DARK']} style={{ flexWrap: 'wrap' }}>
                        {item.brand}
                    </CustomText>
                    <CustomText color={colors['SHADEDARK']} >
                        {substring(item.name, 25)}
                    </CustomText>
                    <CustomText color={colors['SHADELIGHT']}>
                        Sold by: {substring(item.soldBy, 15)}
                    </CustomText>
                    <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                        <Size currentSize={item.currentSize} />

                    </View>
                </View>
                <TouchableOpacity onPress={removeHandler}>
                    <FastImage
                        source={{ uri: ICONS.ICON_CLOSE }}
                        style={{ height: 15, width: 15 }}
                        tintColor={colors['DARK']}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', top: 15, left: 13 }}>
                <CheckBox
                    value={selected.includes(item.id)}
                    changeHandler={onPressHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row'
    },
    image: {
        width: '35%',
        height: 150,
        resizeMode: 'contain'
    }
})

export default Card