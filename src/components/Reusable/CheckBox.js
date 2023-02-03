import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const CheckBox = ({ value, dimension, radius, changeHandler, tickHidden, radio, radioPadding }) => {

    const { colors } = useSelector(state => state.theme)

    const style = {
        backgroundColor: value ? colors['PRIMARY'] : colors['LIGHT'],
        borderColor: colors['DARK'],
        height: dimension ?? 20,
        width: dimension ?? 20,
        borderRadius: radius ?? 4,
        borderWidth: value ? 0 : 1
    }

    const pressHandler = () => {
        if (changeHandler) changeHandler()
    }

    return (
        <TouchableOpacity onPress={pressHandler} style={[styles.container, style]}>
            {
                radio ?
                    <View style={{ borderColor: colors['LIGHT'], borderWidth: 2, padding: radioPadding ?? 6, borderRadius: style.borderRadius }} />
                    :
                    !tickHidden && value && <FastImage
                        source={{ uri: ICONS.ICON_CHECK }}
                        style={{ height: dimension ? 0.7 * dimension : 12.5, width: dimension ? 0.7 * dimension : 12.5, }}
                        tintColor={colors['WHITE']}
                    />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default CheckBox