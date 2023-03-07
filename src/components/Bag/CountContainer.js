import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import LoaderContext from '../../context/loaderContext'
import ICONS from '../../icons/icons'
import { removeSelected, setSelected } from '../../redux/bagSlice'
import { formatCurrency, showToast } from '../../utils/utils'
import CheckBox from '../Reusable/CheckBox'
import CustomText from '../Reusable/CustomText'

const CountContainer = () => {

    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const { items, selected, others } = useSelector(state => state.bag)
    const { setLoaded, refresh } = useContext(LoaderContext)
    let selectedCount = items.reduce((result, item) => {
        return item.selected ? result + 1 : result
    }, 0)


    const unselectAll = async _ => {
        // if (selected.length === items.length) dispatch(setSelected('none'))
        // else dispatch(setSelected('all'))
        // setLoaded(false)
        // let list = items.filter(item => {
        //     if (selectedCount === 0) return true // then select all
        //     else if (selectedCount === items.length) return true // then unselected all
            
        //     return item.selected // then selected only that are false
            
        // })

        // let target = true;
        // if (selectedCount === items.length) target = false

        // list = list.map(item => ({
        //     id: item.clothId,
        //     size: item.currentSize,
        //     selected: target
        // }))
        // this one needs to be implemented ask keerthivaasan
        setLoaded(false)
        let target = selectedCount === items.length ? 'none' : 'all'
        axios.put(`${Config.API_KEY}/bag/${target}`)
        .then(res => refresh())
            .catch(err => {
                console.log("Error in Bag/CountContainer: ", err)
                showToast('Something went wrong while editing your bag. Please try again later!')
                setLoaded(false)
            })
    }

    const removeHandler = async _ => {
        if(selected.length === 0)return
        let list = items.filter(item => selected.includes(item.id))
        list = list.map(item => ({ productId: item.id, size: item.currentSize }))
        setLoaded(false)
        try {
            const result = await axios.delete(`${Config.API_KEY}/bag`, {
                data: {
                    list
                }
            })
            dispatch(removeSelected())
        } catch (err) {
            console.log("Error in Bag/CountContainer: ", err)
            showToast('Unable to remove items from bag. Please try again later!')
        }
        setLoaded(true)
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox value={items.length === selectedCount} changeHandler={unselectAll} />
                <CustomText left={5} color={colors['SHADEDARK']} weight='light'>
                    {selectedCount}/{items.length} ITEMS SELECTED
                </CustomText>
                {selectedCount > 0 && <CustomText weight='light' left={5} color={colors['PRIMARY']}>
                    {/* ( {`${calculateTotal()}`} ) */}
                    {formatCurrency(others.total).split('.')[0]}
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