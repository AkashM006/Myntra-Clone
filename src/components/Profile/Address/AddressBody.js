import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import AddressEmpty from './AddressEmpty'
import AddressList from './AddressList'
import AddressForm from './AddressForm'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const AddressBody = ({ showForm, setShowForm }) => {

    const { addresses } = useSelector(state => state.address)
    const leftValue = useSharedValue(0)

    const windowWidth = useWindowDimensions().width

    useEffect(() => {
        const dest = showForm ? 1 : 0
        leftValue.value = withTiming(dest, {
            duration: 200,
        })
    }, [showForm])

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: interpolate(leftValue.value, [0, 1], [windowWidth, 0]) }]
        }
    }, [windowWidth])

    return (
        <View style={{ flex: 1, }}>
            {addresses.length !== 0 ? <AddressEmpty showForm={() => setShowForm(true)} /> : <AddressList />}
            <Animated.View style={[styles.formContainer, rStyle]}>
                <AddressForm hideForm={() => setShowForm(false)} visible={showForm} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 11,
    }
})

export default AddressBody