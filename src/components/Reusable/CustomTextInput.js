import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomText from './CustomText'

const CustomTextInput = ({ placeholder, value, onChangeTextHandler, error }) => {

    const [isActive, setIsActive] = useState(false)

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeTextHandler}
                placeholderTextColor='#aaaaaa'
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                style={[styles.input, { borderColor: isActive ? '#818181' : error === null ? '#c4c4c4' : 'red', }]}
            />
            {
                error && <CustomText style={styles.error}>
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
    error: {
        fontSize: 10,
        color: 'red'
    }
})

export default CustomTextInput