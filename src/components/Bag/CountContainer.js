import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import ICONS from '../../icons/icons'
import { removeSelected, setSelected } from '../../redux/bagSlice'
import { formatCurrency } from '../../utils/utils'
import CheckBox from '../Reusable/CheckBox'
import CustomText from '../Reusable/CustomText'

const CountContainer = () => {

    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const { items, selected } = useSelector(state => state.bag)

    const unselectAll = () => {
        if (selected.length === items.length) dispatch(setSelected('none'))
        else dispatch(setSelected('all'))
    }

    const calculateTotal = () => {
        let total = items.reduce((total, item) => {
            if (selected.includes(item.id)) {
                return total + (item.qty * Math.round(item.mrp * (1 - (item.discount / 100))))
            }
            return total
        }, 0)

        return formatCurrency(total).split('.')[0]
    }

    const removeHandler = () => { dispatch(removeSelected()) }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox value={items.length === selected.length} changeHandler={unselectAll} />
                <CustomText left={5} color={colors['SHADEDARK']} weight='light'>
                    {selected.length}/{items.length} ITEMS SELECTED
                </CustomText>
                {selected.length > 0 && <CustomText weight='light' left={5} color={colors['PRIMARY']}>
                    ( {`${calculateTotal()}`} )
                </CustomText>}
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={removeHandler}>
                    <FastImage
                        style={[styles.icon, { marginRight: 10 }]}
                        resizeMode='contain'
                        source={{ uri: ICONS.ICON_DELETE }}
                        tintColor={colors['DARK']}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FastImage
                        style={styles.icon}
                        resizeMode='contain'
                        source={{ uri: ICONS.ICON_HEART_BAG }}
                        tintColor={colors['DARK']}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        paddingHorizontal: '1.5%'
    },
    icon: {
        height: 25,
        width: 25,
    }
})

export default CountContainer