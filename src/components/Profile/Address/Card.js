import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../../Reusable/CustomText'
import { setEditing, setSelected } from '../../../redux/addressSlice'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useEffect } from 'react'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from '../../../utils/utils'
import { closeLoading, setLoading } from '../../../redux/uiSlice'

const Card = ({ address, index, selected, rerender, showForm }) => {

    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const offset = useSharedValue(0)

    useEffect(() => {
        const dest = selected === address.id ? 1 : 0
        offset.value = withSpring(dest, {
            damping: 50,
        })
    }, [selected])

    const rStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(offset.value, [0, 0.95, 1], [0, 90, 90]),
            paddingVertical: interpolate(offset.value, [0, 0.95, 1], [0, 5, 5]),
            opacity: interpolate(offset.value, [0, 0.95, 1], [0, 0, 1]),
        }
    }, [selected])

    const editHandler = () => {
        dispatch(setEditing(address.id))
        showForm()
    }

    const deleteHandler = async () => {
        dispatch(setLoading({
            loading: true
        }))
        try {
            const result = await axios.delete(`${Config.REGISTER_API_KEY}/authenticate/address/${address.id}`)
            const data = result.data
            if (!data.status) showToast(data.message)
            else rerender()
        } catch (error) {
            console.log("Error in Address/Card.js: ", error)
            showToast("Something went wrong while deleting your address. Please try again later!")
        }
        dispatch(closeLoading())
    }

    return (
        <Pressable onPress={() => dispatch(setSelected(address.id))} style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            {index === 0 && <CustomText weight='bold' color={colors['DARK']} size={13} bottom={20}>
                DEFAULT ADDRESS
            </CustomText>}
            {index === 1 && <CustomText weight='bold' color={colors['DARK']} size={13} bottom={20} top={20}>
                OTHER ADDRESS
            </CustomText>}
            <View style={[styles.contentContainer, { borderColor: colors['SHADEDARK'] }]}>
                <View style={styles.headerContainer}>
                    <CustomText style={styles.text} color={colors['SHADEDARK']} weight='bolder'>
                        {address.name}
                    </CustomText>
                    <View style={[styles.typeContainer, { backgroundColor: colors['SHADELIGHT'] }]}>
                        <CustomText style={styles.text} color={colors['WHITE']} weight='bold'>
                            {address.typeOfAddress}
                        </CustomText>
                    </View>
                </View>
                <View style={styles.body}>
                    <CustomText style={styles.text} color={colors['SHADEDARK']}>
                        {address.address}
                    </CustomText>
                    <CustomText style={styles.text} color={colors['SHADEDARK']}>
                        {address.locality}
                    </CustomText>
                    <CustomText style={styles.text} color={colors['SHADEDARK']}>
                        {address.city} - {address.pincode}
                    </CustomText>
                </View>
                {
                    <Animated.View style={rStyle}>
                        <CustomText style={styles.text} bottom={15} color={colors['SHADEDARK']}>
                            {address.state}
                        </CustomText>
                        <CustomText style={styles.text} color={colors['SHADEDARK']}>
                            Mobile: {address.mobileNumber}
                        </CustomText>
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.button} onPress={editHandler}>
                                <CustomText color={colors['PRIMARY']} weight='bold'>
                                    EDIT
                                </CustomText>
                            </Pressable>
                            <View style={[styles.separator, { backgroundColor: colors['SHADELIGHT'] }]} />
                            <Pressable style={styles.button} onPress={deleteHandler}>
                                <CustomText color={colors['PRIMARY']} weight='bold'>
                                    DELETE
                                </CustomText>
                            </Pressable>
                        </View>
                    </Animated.View>
                }
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3.5%',
        marginVertical: 20
    },
    contentContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 4
    },
    typeContainer: {
        borderRadius: 30,
        padding: 5,
        paddingHorizontal: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: { flexWrap: 'wrap' },
    buttonContainer: {
        height: 50,
        flexDirection: 'row'
    },
    button: {
        width: '49.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 30,
        width: 1,
        alignSelf: 'center'
    }
})

export default Card