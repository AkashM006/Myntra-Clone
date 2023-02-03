import { View, TextInput, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomText from './CustomText'
import { useSelector } from 'react-redux'

const CustomTextInput = ({ placeholder, value, onBlurHandler, onChangeTextHandler, error, secure, onEndEditingHandler, type, ...props }) => {

    const [isActive, setIsActive] = useState(false)

    const handleBlur = onBlurHandler ?? null

    const { colors } = useSelector(state => state.theme)

    const borderStyle = { borderColor: isActive ? colors['SHADEDARK'] : error == null ? colors['SHADELIGHT'] : colors['DANGER'] }

    const onFocusHandler = useCallback(() => setIsActive(true), [])
    const handleEndEditing = useCallback(() => {
        if (onEndEditingHandler) onEndEditingHandler()
        setIsActive(false)
    }, [])

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeTextHandler}
                placeholderTextColor={colors['SHADELIGHT']}
                onFocus={onFocusHandler}
                onBlur={handleBlur}
                onEndEditing={handleEndEditing}
                style={[styles.input, borderStyle, { color: colors['DARK'] }]}
                secureTextEntry={secure ?? false}
                keyboardType={type ?? 'ascii-capable'}
                cursorColor={colors['PRIMARY']}
                {...props}
            />
            {
                error && <CustomText bottom={5} size={10} color={colors['DANGER']}>
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