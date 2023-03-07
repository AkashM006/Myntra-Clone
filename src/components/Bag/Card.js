import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import CustomText from '../Reusable/CustomText'
import CheckBox from '../Reusable/CheckBox'
import { addSelection, removeFromBag, removeSelection } from '../../redux/bagSlice'
import { formatCurrency, showToast, substring } from '../../utils/utils'
import Size from './Size'
import Qty from './Qty'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import LoaderContext from '../../context/loaderContext'
import Config from 'react-native-config'

const Card = ({ item, showPopUpHandler }) => {

    const { selected, items } = useSelector(state => state.bag)
    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const currentItem = items.find(value => value.id === item.id)
    const [isAvailable, setIsAvailable] = useState(true)
    const [isQtyAvailable, setIsQtyAvailable] = useState(true)
    const [maxQty, setMaxQty] = useState(null)

    const [isQtyLess, setIsQtyLess] = useState(false)

    const { setLoaded, refresh } = useContext(LoaderContext)

    useEffect(() => {
        const sizes = item.size
        const currentSizeObject = sizes.find(size => size.name === item.currentSize)
        setMaxQty(currentSizeObject.maxQty)
        if (!currentSizeObject.available || currentSizeObject.maxQty === 0) {
            setIsAvailable(false)
            setIsQtyAvailable(true)
        }
        else if (item.qty > currentSizeObject.maxQty) {
            setIsAvailable(true)
            setIsQtyAvailable(false)
        }
        else if (item.qty <= currentSizeObject.maxQty) {
            setIsAvailable(true)
            setIsQtyAvailable(true)
        }

        if (currentSizeObject.maxQty <= 5) setIsQtyLess(true)
        else setIsQtyLess(false)
    }, [currentItem])


    const onPressHandler = async _ => {

        setLoaded(false)
        const target = !item.selected
        axios.put(`${Config.API_KEY}/bag`, {
            productId: item.clothId,
            size: item.currentSize,
            selected: target,
            quantity: null,
            newSize: null
        })
            .then(res => refresh())
            .catch(err => {
                console.log("Error in Bag/Card.js: ", err)
                showToast('Something went wrong. Please try again later!')
            })
    }

    const removeHandler = async _ => {
        setLoaded(false)
        try {
            const result = await axios.delete(`${Config.API_KEY}/bag`, {
                data: {
                    list: [
                        {
                            productId: item.id,
                            size: item.currentSize
                        }
                    ]
                }
            })
            dispatch(removeFromBag(item.id))
        } catch (err) {
            console.log("Error in Bag/Card.js: ", err)
            showToast('Unable to remove item from bag. Please try again later')
        }
        setLoaded(true)
    }
    const hasNoError = isAvailable && isQtyAvailable

    return (
        <View style={[styles.container, { borderColor: hasNoError ? colors['LIGHT'] : colors['DANGER'], }]}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <View style={styles.rightContainer}>
                <View style={{ justifyContent: 'flex-start' }}>
                    <CustomText weight='bolder' color={colors['DARK']} style={styles.brand}>
                        {item.brand}
                    </CustomText>
                    <CustomText color={colors['SHADEDARK']} >
                        {substring(item.name, 25)}
                    </CustomText>
                    {item.soldBy && <CustomText color={colors['SHADELIGHT']}>
                        Sold by: {substring(item.soldBy, 15)}
                    </CustomText>}
                    <View style={{ marginVertical: 10 }}>
                        {isAvailable && <View style={[styles.dropDownContainer, { backgroundColor: isQtyAvailable ? colors['LIGHT'] : colors['DANGERBG'] }]}>
                            <Size id={item.id} showPopUpHandler={showPopUpHandler} currentSize={item.currentSize} />
                            <Qty disabled={!isQtyAvailable} id={item.id} showPopUpHandler={showPopUpHandler} qty={item.qty} />
                            {isQtyAvailable && isAvailable && maxQty && maxQty <= 5 && <CustomText style={[styles.border, { borderColor: colors['DANGER'] }]} weight='bold' left={5} color={colors['DANGER']}>
                                {maxQty} Left
                            </CustomText>}
                        </View>}
                        {!isQtyAvailable && <CustomText top={3} weight='bold' color={colors['DANGER']}>
                            Selected quantity is not available
                        </CustomText>}
                    </View>
                    {!isAvailable && <View style={{ alignSelf: 'flex-start', borderColor: colors['DANGER'], borderWidth: 1, borderRadius: 4, padding: 2, paddingHorizontal: 5, marginBottom: 5 }}>
                        <CustomText size={10} weight='bold' color={colors['DANGER']}>
                            Item out of stock
                        </CustomText>
                    </View>}
                    <View style={styles.pricesContainer}>
                        <CustomText weight='light' color={colors['DARK']} right={5}>
                            {formatCurrency(item.qty * Math.round(item.mrp * (1 - (item.discount / 100)))).split('.')[0]}
                        </CustomText>
                        {item.discount > 0 && <CustomText right={5} color={colors['SHADEDARK']} style={{ textDecorationLine: 'line-through' }}>
                            {formatCurrency(Math.round(item.mrp * item.qty)).split('.')[0]}
                        </CustomText>}
                        {item.discount > 0 && <CustomText color={colors['PRIMARY']} size={13}>
                            {item.discount}% OFF
                        </CustomText>}
                    </View>
                </View>
                <TouchableOpacity onPress={removeHandler}>
                    <FastImage
                        source={{ uri: ICONS.ICON_CLOSE }}
                        style={styles.icon}
                        tintColor={colors['DARK']}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    // value={selected.includes(item.id)}
                    value={item.selected}
                    changeHandler={onPressHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5
    },
    image: {
        width: '35%',
        height: 150,
        resizeMode: 'cover'
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginLeft: '2.5%',
    },
    checkboxContainer: {
        position: 'absolute',
        top: 15,
        left: 17,
    },
    dropDownContainer: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    pricesContainer: { flexDirection: 'row' },
    icon: { height: 15, width: 15 },
    brand: { flexWrap: 'wrap' },
    border: {
        borderWidth: 1,
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 4
    }
})

export default Card