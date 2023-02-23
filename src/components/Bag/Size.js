import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Size = ({ currentSize, showPopUpHandler, id }) => {

    const { colors } = useSelector(state => state.theme)

    const pressHandler = () => showPopUpHandler('Size', id)

    return (
        <Pressable onPress={pressHandler} style={styles.container}>
            <CustomText right={3} weight='bold'>
                Size: {currentSize}
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
        paddingHorizontal: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Size