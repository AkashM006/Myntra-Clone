import { View, TextInput, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'

const CustomTextInput = ({ placeholder, value, onChangeTextHandler, error, secure, onBlurHandler }) => {

    const [isActive, setIsActive] = useState(false)

    const handleBlur = onBlurHandler ?? null

    const borderStyle = { borderColor: isActive ? COLORS.SHADEDARK : error == null ? COLORS.SHADELIGHT : COLORS.DANGER }

    const onFocusHandler = useCallback(() => setIsActive(true), [])
    const onEndEditingHandler = useCallback(() => setIsActive(false), [])

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeTextHandler}
                placeholderTextColor={COLORS.SHADELIGHT}
                onFocus={onFocusHandler}
                onBlur={handleBlur}
                onEndEditing={onEndEditingHandler}
                style={[styles.input, borderStyle]}
                secureTextEntry={secure ?? false}
            />
            {
                error && <CustomText bottom={5} size={10} color={COLORS.DANGER}>
                    {error}
                </CustomText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 3,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        color: 'black'
    },
})

export default CustomTextInput